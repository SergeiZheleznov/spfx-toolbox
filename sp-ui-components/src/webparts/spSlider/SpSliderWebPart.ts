import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpSliderWebPartStrings';
import {SpSlider} from './components/SpSlider';
import { ISpSliderProps } from './components/ISpSliderProps';
import { MSGraphClient } from '@microsoft/sp-http';
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';
import {
  Logger,
  ConsoleListener,
  LogLevel
} from "@pnp/logging";

import {File} from "@microsoft/microsoft-graph-types";
import { graph } from "@pnp/graph";

Logger.subscribe(new ConsoleListener());
Logger.activeLogLevel = LogLevel.Info;
const LOG_SOURCE: string = 'ExtensionsExplorerWebPart';

export interface ISpSliderWebPartProps {
  description: string;
}

export default class SpSliderWebPart extends BaseClientSideWebPart <ISpSliderWebPartProps> {

  private graphClient: MSGraphClient;
  private themeProvider: ThemeProvider;
  private themeVariant: IReadonlyTheme | undefined;
  private images: string[] = [];

  public async onInit(): Promise<void> {
    try {
      this.themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
      this.themeVariant = this.themeProvider.tryGetTheme();
      this.themeProvider.themeChangedEvent.add(this, (args: ThemeChangedEventArgs) => {
        this.themeVariant = args.theme;
        this.render();
      });

      this.graphClient = await this.context.msGraphClientFactory.getClient();
      const response = await this.graphClient.api(`/sites/${this.context.pageContext.site.id}/drive/root:/slider:/children`).get();

      this.images = response.value.map((el)=>{
        return el.webUrl;
      });

    } catch (error) {
      console.error(error);
    }
  }

  public render(): void {

    const element: React.ReactElement<ISpSliderProps> = React.createElement(
      SpSlider,
      {
        description: this.properties.description,
        images: this.images
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
