import React from "react";
import { Editor } from "@tinymce/tinymce-react";

function TextEditor(name, id, initialValue, height, disabled, onChange) {
  return (
    <>
      <Editor
        disabled={disabled}
        apiKey={`${process.env.REACT_APP_TINY_MCE_API_KEY}`}
        textareaName={name}
        initialValue={initialValue}
        init={{
          height: height || 200,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        // onEditorChange={(newText) => SetBody(newText)}
      />
    </>
  );
}

export default TextEditor;
