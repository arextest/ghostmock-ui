/**
 * ActionGroup多行Select录入组件: NodesLinks
 */

import { Button, Select, Space } from "antd";
import { TypeAction } from "pages/Action/typing";
import {
  OptionsType,
  OptionData,
  OptionGroupData,
} from "rc-select/lib/interface";
import React from "react";
import { TypeSelectLineData } from "./typing";

const { Option } = Select;
export const NodesLinks = ({
  selectLinesData,
  setSelectLinesData,
  allNodes,
}: {
  selectLinesData: TypeSelectLineData[];
  setSelectLinesData: React.Dispatch<
    React.SetStateAction<TypeSelectLineData[]>
  >;
  allNodes: TypeAction[];
}) => {
  function handleChange(
    value: TypeSelectLineData,
    item: OptionsType | OptionData | OptionGroupData,
    index: number
  ) {
    const cloneData = JSON.parse(JSON.stringify(selectLinesData));
    cloneData.forEach(
      (forEachitem: TypeSelectLineData, forEachindex: number) => {
        if (forEachindex === index) {
          cloneData[forEachindex] = value;
        }
      }
    );
    console.log("selectLinesData", selectLinesData);
    setSelectLinesData(cloneData);
  }
  return (
    <div>
      <Space direction="vertical">
        <Button
          type="primary"
          onClick={() => {
            setSelectLinesData([...selectLinesData, []]);
          }}
        >
          添加一行
        </Button>
        {selectLinesData.map((item, index) => {
          return (
            <div key={index}>
              <Space>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "400px" }}
                  placeholder="Please select"
                  value={item}
                  onChange={(value, item) => {
                    handleChange(value, item, index);
                  }}
                >
                  {allNodes.map((n) => (
                    // 使用 ^*^ 对action _id 和 name 进行拼接
                    <Option key={n._id} value={n._id + "^*^" + n.name}>
                      {n.name}
                    </Option>
                  ))}
                </Select>
                <a
                  onClick={() => {
                    setSelectLinesData(
                      selectLinesData
                        .slice(0, index)
                        .concat(
                          selectLinesData.slice(
                            index + 1,
                            selectLinesData.length
                          )
                        )
                    );
                  }}
                >
                  删除
                </a>
              </Space>
            </div>
          );
        })}
      </Space>
    </div>
  );
};
