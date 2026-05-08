import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class pp implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _iframe: HTMLIFrameElement | null = null;
    private _container: HTMLDivElement | null = null;
    private readonly _siteUrl = "https://skill-bridge-two-zeta.vercel.app/";
    private readonly _sharePointSiteUrl = "https://adityagroup.sharepoint.com/sites/Project_8.0";
    private readonly _sharePointListTitle = "SkillDomainn";
    private readonly _listItemType = "SP.Data.SkillDomainnListItem";
    private _handleMessage: (event: MessageEvent) => void;

    constructor() {
        this._handleMessage = this.handleMessage.bind(this);
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this._container = container;

        container.style.width = "100%";
        container.style.height = "100%";
        container.style.position = "relative";
        container.style.overflow = "hidden";

        const iframe = document.createElement("iframe");
        iframe.src = this._siteUrl;
        iframe.style.position = "absolute";
        iframe.style.top = "0";
        iframe.style.left = "0";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "0";
        iframe.style.minWidth = "100%";
        iframe.style.minHeight = "100%";
        iframe.allowFullscreen = true;
        iframe.setAttribute("loading", "lazy");
        iframe.setAttribute(
            "sandbox",
            "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        );

        container.appendChild(iframe);
        this._iframe = iframe;

        window.addEventListener("message", this._handleMessage);
    }

    private handleMessage(event: MessageEvent): void {
        if (event.origin !== this._siteUrl.replace(/\/$/, "")) {
            return;
        }

        if (!event.data || typeof event.data !== "object") {
            return;
        }

        this.uploadToSharePoint(event.data as Record<string, unknown>);
    }

    private async getRequestDigest(): Promise<string> {
        const response = await fetch(`${this._sharePointSiteUrl}/_api/contextinfo`, {
            method: "POST",
            headers: {
                "Accept": "application/json;odata=verbose"
            },
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`Unable to get request digest: ${response.statusText}`);
        }

        const digestResult = await response.json();
        return digestResult.d.GetContextWebInformation.FormDigestValue;
    }

    private async uploadToSharePoint(data: Record<string, unknown>): Promise<void> {
        const requestDigest = await this.getRequestDigest();
        const itemData = { ...data };
        const file = itemData.file as File | undefined;
        delete itemData.file;

        const body = JSON.stringify({
            __metadata: { type: this._listItemType },
            ...itemData
        });

        try {
            const response = await fetch(
                `${this._sharePointSiteUrl}/_api/web/lists/getbytitle('${this._sharePointListTitle}')/items`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json;odata=verbose",
                        "Accept": "application/json;odata=verbose",
                        "X-RequestDigest": requestDigest
                    },
                    credentials: "include",
                    body
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Failed to create SharePoint item:", response.status, response.statusText, errorText);
                return;
            }

            const result = await response.json();
            const itemId = result.d.Id;
            console.log("SharePoint item created successfully, ID:", itemId);

            if (file instanceof File) {
                await this.uploadAttachment(itemId, file, requestDigest);
            }
        } catch (error) {
            console.error("Error uploading data to SharePoint:", error);
        }
    }

    private async uploadAttachment(itemId: number, file: File, requestDigest: string): Promise<void> {
        const url = `${this._sharePointSiteUrl}/_api/web/lists/getbytitle('${this._sharePointListTitle}')/items(${itemId})/AttachmentFiles/add(FileName='${encodeURIComponent(
            file.name
        )}')`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": requestDigest
                },
                credentials: "include",
                body: file
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Failed to upload attachment:", response.status, response.statusText, errorText);
                return;
            }

            console.log("Attachment uploaded successfully");
        } catch (error) {
            console.error("Error uploading attachment to SharePoint:", error);
        }
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        if (!this._iframe || !this._container) {
            return;
        }

        this._iframe.style.width = "100%";
        this._iframe.style.height = "100%";

        if (context.mode.allocatedHeight && context.mode.allocatedHeight > 0) {
            this._container.style.height = `${context.mode.allocatedHeight}px`;
        } else {
            this._container.style.height = "100%";
        }

        if (context.mode.allocatedWidth && context.mode.allocatedWidth > 0) {
            this._container.style.width = `${context.mode.allocatedWidth}px`;
        } else {
            this._container.style.width = "100%";
        }
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        window.removeEventListener("message", this._handleMessage);

        if (this._iframe && this._iframe.parentElement) {
            this._iframe.parentElement.removeChild(this._iframe);
        }

        this._iframe = null;
        this._container = null;
    }
}