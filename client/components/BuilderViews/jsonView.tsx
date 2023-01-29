import React, { useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/ext-language_tools';
import Modal from '@components/Modal';
import Button from '@components/Button';
import useTranslation from 'next-translate/useTranslation';

export default function JsonView(props: any) {
  const { t } = useTranslation('common');

  const {
    storyGraph, openView, setOpenView, onStoryGraphChange,
  } = props;
  const [json, setJson] = useState(JSON.stringify(storyGraph, null, 2));
  return (
    <Modal
      bodyStyle={{
        padding: 0,
      }}
      visible={openView}
      onCancel={() => {
        setOpenView(false);
      }}
    >
      <div className="w-full h-full relative bg-black ">
        <h1 className="text-2xl text-center text-red-500">
          {t('builder.debug_tool.title')}
        </h1>
        <p className="text-base text-center text-red-500">
          {t('builder.debug_tool.sub_title')}

        </p>
        <AceEditor
          style={{
            width: '100%',
          }}
          placeholder="Placeholder Text"
          mode="json"
          theme="terminal"
          name="story_graph"
          onChange={(newJson) => {
            setJson(newJson);
          }}
          fontSize={14}
          showPrintMargin
          showGutter
          highlightActiveLine
          value={json}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
        <div className="flex flex-col items-center justify-center">
          <Button
            onClick={() => {
              onStoryGraphChange(JSON.parse(json));
            }}
            label={t('builder.debug_tool.apply')}
            className="m-2 w-1/2"
          />
        </div>
      </div>
    </Modal>
  );
}
