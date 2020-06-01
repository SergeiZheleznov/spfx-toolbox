import * as React from 'react';
import {IColorCardProps} from "./IColorCardProps";
import styles from "./ColorCard.module.scss";
import {IconButton, Stack} from "@fluentui/react";
import {useContext} from "react";
import {ConfigurationContext} from "../../../shared/ConfigurationContext";
import {IReadonlyTheme} from "@microsoft/sp-component-base";

export const ColorCard: React.FunctionComponent<IColorCardProps> = (props) => {
  const config = useContext(ConfigurationContext);
  const {semanticColors}: IReadonlyTheme = config.themeVariant;
  const style: React.CSSProperties = {
    background: props.color,
    borderColor: semanticColors.inputBorder,
  };
  return(
    <div className={styles.colorCard} >
      <div className={styles.body} style={{borderColor: semanticColors.bodyDivider}}>
        <Stack horizontal horizontalAlign={'space-between'}>
          <Stack.Item>
            <div className={styles.color} style={style}></div>
            <span className={styles.name}>{props.name}</span>
          </Stack.Item>
          <Stack.Item>
            <IconButton data-color={props.name} iconProps={{iconName: 'Paste'}} onClick={props.onClickHandler} />
          </Stack.Item>
        </Stack>
      </div>
    </div>
  );
};
