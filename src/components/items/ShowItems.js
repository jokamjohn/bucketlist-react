import React from 'react';
import Item from "./Item";
import {formatDate} from "../../utilities/Utils";

export const ShowItems = props => (
    <div className="row">
      {props.items.map((item, index) =>
          <Item key={item.id} name={item.name} description={item.description}
                modifiedAt={formatDate(item.modifiedAt)}/>
      )}
    </div>
);
