# DoomPcf demo

This is the source code for a little stupid demo I did and posted to [LinkedIn](https://www.linkedin.com/posts/andreas-adner-70b1153_pcf-webassembly-dataverse-activity-7341938289056075777-hT-R?utm_source=share&utm_medium=member_desktop&rcm=ACoAAACM8rsBEgQIrYgb4NZAbnxwfDRk_Tu5e3w).

It demonstrates a PowerApps component framework (PCF) controls that loads Doom. This webassembly version of doom comes from Mattias Gustavssons [repo](https://github.com/mattiasgustavsson/doom-crt) - I owe him thanks! For convenience, my repo includes a [pre-built version](/doom-crt-built/doom-crt.html), if you don't want to build it yourself.

## How to deploy and configure
- ```doom-crt.html``` needs to uploaded to a Web Resource in your environment.
- Update [index.ts](/PcfDoomComponent/index.ts) and modify ```const iFrameSrc = "/WebResources/cc_doomcrt"```so that it points to your Web Resource.
- Use the PAC CLI and run ```pac pcf push``` to upload the PCF to your environment.
- Using the "classic" for editor, modify the properties of a Textarea field, and configure the **PcfDoomComponent** on the **Controls** tab.
- The **TextArea** property should be bound to a textarea field.
- The **DoomEnablerOptionSet** should be bound to a OptionSet field. This field needs to have an option with the value of **5** for the textarea to be replaced by Doom (can be changed in [index.ts](/PcfDoomComponent/index.ts)).

![Configuration](/images/image1.png)

# Other instructions

## Building and deploying
- If the component is updated, the version in ```ControlManifest.Input.xml``` needs to be bumped, in order to see the latest changes in the runtime.
- Build the component using ```npm run build```.

## Updating the manifest file - ControlManifest.Input.xml
Run after modifying the manifest, to rebuild ManifestTypes.d.ts file: ```npm run refreshTypes```

## Debugging
- ```const iFrameSrc = "/WebResources/cc_doomcrt"``` in ```index.ts``` needs to be modified to point to some place where ```doom-crt.html``` is available.
- Run ```npm start watch```, or ```npm run start```, to start the test harness.

## Find and fix lint issues
- ```npm run lint:fix```
- ```npx eslint . --debug``` 

## Create solution
- ```mkdir Solutions && cd Solutions```
- ```pac solution init --publisher-name DoomPublisher --publisher-prefix doom```
- ```pac solution add-reference --path ..\```
- ```dotnet build```

## Pushing to environment
- ```pac pcf push```