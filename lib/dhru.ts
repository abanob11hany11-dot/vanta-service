// DHRU Fusion API Client
// Standard protocol for GSM / Mobile unlock servers

interface DhruConfig {
  apiUrl: string;
  username: string;
  apiKey: string;
}

export class DhruClient {
  private config: DhruConfig;

  constructor(config?: Partial<DhruConfig>) {
    this.config = {
      apiUrl: config?.apiUrl || process.env.DHRU_API_URL || "https://demo.dhru.com/api/index.php",
      username: config?.username || process.env.DHRU_USERNAME || "vanta_admin",
      apiKey: config?.apiKey || process.env.DHRU_API_KEY || "vanta_secret_key",
    };
  }

  // Submit IMEI / Service order to external DHRU provider
  async placeImeiOrder(params: {
    serviceId: string;
    imei: string;
    customFields?: Record<string, string>;
  }): Promise<{ success: boolean; remoteOrderId?: string; error?: string; raw?: any }> {
    try {
      // In development or if DHRU is demo, simulate immediate order placement
      if (this.config.apiKey === "vanta_secret_key" || !this.config.apiUrl.startsWith("http")) {
        const mockRemoteId = `DHRU-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        return {
          success: true,
          remoteOrderId: mockRemoteId,
          raw: { status: "Submitted", reference_id: mockRemoteId },
        };
      }

      const bodyData = new URLSearchParams({
        username: this.config.username,
        apiaccesskey: this.config.apiKey,
        action: "placeimeiorder",
        parameters: JSON.stringify({
          ID: params.serviceId,
          IMEI: params.imei,
          ...params.customFields,
        }),
      });

      const res = await fetch(this.config.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: bodyData.toString(),
      });

      const data = await res.json();
      if (data.SUCCESS && data.SUCCESS[0]?.REFERENCEID) {
        return {
          success: true,
          remoteOrderId: data.SUCCESS[0].REFERENCEID,
          raw: data,
        };
      }

      return {
        success: false,
        error: data.ERROR?.[0]?.MESSAGE || "DHRU Server returned error",
        raw: data,
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || "Failed to reach external DHRU API",
      };
    }
  }

  // Check remote order status
  async getImeiOrder(remoteOrderId: string): Promise<{
    status: "pending" | "completed" | "rejected";
    code?: string;
    raw?: any;
  }> {
    // If mock or demo
    if (this.config.apiKey === "vanta_secret_key") {
      return { status: "completed", code: "CODE-OK-" + Math.random().toString(36).substring(7).toUpperCase() };
    }

    try {
      const bodyData = new URLSearchParams({
        username: this.config.username,
        apiaccesskey: this.config.apiKey,
        action: "getimeiorder",
        parameters: JSON.stringify({ ID: remoteOrderId }),
      });

      const res = await fetch(this.config.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: bodyData.toString(),
      });

      const data = await res.json();
      const orderData = data.SUCCESS?.[0];

      if (orderData?.STATUS === "Completed") {
        return { status: "completed", code: orderData.CODE || orderData.MESSAGE };
      }
      if (orderData?.STATUS === "Rejected") {
        return { status: "rejected" };
      }
      return { status: "pending" };
    } catch {
      return { status: "pending" };
    }
  }
}

export const dhru = new DhruClient();
