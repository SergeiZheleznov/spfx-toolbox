import * as React from 'react';
import styles from './ColorSchemeTest.module.scss';
import { IColorSchemeTestProps } from './IColorSchemeTestProps';
import { Theme } from 'spfx-uifabric-themes';

export default class ColorSchemeTest extends React.Component<IColorSchemeTestProps, { showPreContent: boolean }> {

  public state = {
    showPreContent: false
  };

  public render(): React.ReactElement<IColorSchemeTestProps> {

    const items: JSX.Element[] = [];

    for (const cssClass in window.__themeState__.theme) {
      if (window.__themeState__.theme.hasOwnProperty(cssClass)) {
        const element = window.__themeState__.theme[cssClass];
        const regexp = new RegExp('^#.+$');

        if (regexp.test(element)){
          items.push(
            <div key={element} className={ styles.item } style={{
              backgroundColor: window.__themeState__.theme[cssClass]
            }}>
              { cssClass }: {window.__themeState__.theme[cssClass]}
            </div>
          );
        }
      }
    }

    return (
      <div className={ styles.colorScheme }>
        { items }
        <button onClick={this.onClickButtonHandler}>{this.state.showPreContent ? "hide" : "show"}</button>

        <pre style={{
          display: this.state.showPreContent ? "block" : "none",
        }}>
          { JSON.stringify( window.__themeState__.theme, null, 2 ) }
        </pre>
      </div>
    );
  }

  private onClickButtonHandler = (): void => {
    const showPreContent = !this.state.showPreContent;
    this.setState({showPreContent});
  }
}
