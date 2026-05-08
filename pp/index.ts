import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class pp implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _iframe: HTMLIFrameElement | null = null;
    private _container: HTMLDivElement | null = null;
    private readonly _siteUrl = "https://skill-bridge-two-zeta.vercel.app/";

    constructor() {
        // Empty
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this._container = container;

        const iframe = document.createElement("iframe");
        iframe.src = this._siteUrl;
        iframe.style.border = "0";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.minHeight = "600px";
        iframe.allowFullscreen = true;
        iframe.setAttribute("loading", "lazy");
        iframe.setAttribute(
            "sandbox",
            "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        );

        container.appendChild(iframe);
        this._iframe = iframe;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        if (!this._iframe || !this._container) {
            return;
        }

        this._iframe.style.width = "100%";
        this._iframe.style.height = "100%";

        if (context.mode.allocatedHeight) {
            this._container.style.height = `${context.mode.allocatedHeight}px`;
        }
        if (context.mode.allocatedWidth) {
            this._container.style.width = `${context.mode.allocatedWidth}px`;
        }
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        if (this._iframe && this._iframe.parentElement) {
            this._iframe.parentElement.removeChild(this._iframe);
        }

        this._iframe = null;
        this._container = null;
    }
}


