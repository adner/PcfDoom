import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class PcfDoomComponent implements ComponentFramework.StandardControl<IInputs, IOutputs> {
   
    private _container: HTMLDivElement;
    private _rootContainer: HTMLDivElement;
    private _context: ComponentFramework.Context<IInputs>;
    private _controlViewRendered: boolean;
    private _doomIframe: HTMLElement;
    private _bossKey: HTMLButtonElement;

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public async init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): Promise<void>  {
       
        this._context  = context;
        this._rootContainer = container;
        this._container = document.createElement("div");
        this._container.classList.add("iframe-wrapper");        
        this._bossKey = document.createElement("button");
        this._bossKey.textContent = "BOSS KEY";
        this._bossKey.classList.add("bossKey");
        this._bossKey.addEventListener("click", this.onBossKeyClick.bind(this));   
        
        // Create and show textarea with professional text
        const textarea = document.createElement("textarea");
        textarea.id = "seriousTextArea";
        textarea.value = "We are currently working on the TPS report for this customer ";
        textarea.style.font = "Segoe UI";
        textarea.style.width = "95%";
        textarea.style.height = "60%";
        textarea.style.fontSize = "14px";
        textarea.style.padding = "10px";
        textarea.style.border = "1px solid #ccc";
        textarea.style.borderRadius = "4px";
        textarea.readOnly = false;

        this._rootContainer.appendChild(textarea);

        this._rootContainer.appendChild(this._container);

        this._controlViewRendered = false;
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
       
        const optionSetValue = context.parameters.DoomEnablerOptionSet.raw;
       
        if (!this._controlViewRendered && optionSetValue == 5) {
			this._controlViewRendered = true;

            const textarea = document.getElementById("seriousTextArea");
            if (textarea) {
                textarea.style.display = "none";
            }
		
            this.renderDoomIframe();
		}
    }    private renderDoomIframe(): void {
		this._doomIframe = this.createIFrameElement();
        
        // Set up initial animation state
        this._doomIframe.style.position = 'relative';
        this._doomIframe.style.top = '100vh'; // Start from below the viewport
        this._doomIframe.style.opacity = '0';
        this._doomIframe.style.transform = 'scale(0.5) rotate(-10deg)';
        this._doomIframe.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'; // Bouncy easing
        
		this._container.appendChild(this._doomIframe);
        this._container.appendChild(this._bossKey);

        // Modify this to point the where you host doom-crt.html!
        const iFrameSrc = "/WebResources/cc_doomcrt"; 

		// Update the IFrame to point to the updated URL
		this._doomIframe.setAttribute("src", iFrameSrc);
        
        // Trigger animation after a short delay
        setTimeout(() => {
            this._doomIframe.style.top = '0';
            this._doomIframe.style.opacity = '1';
            this._doomIframe.style.transform = 'scale(1) rotate(0deg)';
        }, 100); // Small delay to ensure transition works
	}

    private createIFrameElement(): HTMLElement {
		const iFrameElement: HTMLElement = document.createElement("iframe");
		iFrameElement.setAttribute("class", "PcfDoomComponent_IFrame");
		return iFrameElement;
	}

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }    
      private onBossKeyClick(): void {
        // Fade out iframe and then remove container from DOM and show textarea
        if (this._container && this._container.parentNode) {
            // Find the iframe element with the PcfDoomComponent_IFrame class
            const iframe = this._container.querySelector('.PcfDoomComponent_IFrame') as HTMLElement;
              if (iframe) {
                // Set initial position and transition for fly out effect
                iframe.style.position = 'relative';
                iframe.style.left = '0';
                iframe.style.transition = 'left 0.5s ease-in';
                
                // Start fly out animation
                setTimeout(() => {
                    iframe.style.left = '-100vw'; // Fly out to the left
                    
                    // Wait for animation to complete before removing
                    setTimeout(() => {
                        // Remove the container after animation
                        this._container.parentNode?.removeChild(this._container);

                        const textarea = document.getElementById("seriousTextArea");
                        if (textarea) {
                            textarea.style.display = "block";
                        }

                    }, 500); // Match this to the transition duration
                }, 10); // Small delay to ensure the transition starts
            } else {
                // If iframe is not found, just remove the container immediately
                this._container.parentNode.removeChild(this._container);
            }
        }
    }
}
