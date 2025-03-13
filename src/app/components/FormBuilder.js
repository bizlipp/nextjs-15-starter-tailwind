"use client";
import { useState } from "react";

const fieldTypes = [
  { type: "text", label: "Text Input" },
  { type: "number", label: "Number Input" },
  { type: "checkbox", label: "Checkbox" },
  { type: "radio", label: "Radio Buttons" },
  { type: "select", label: "Dropdown" },
  { type: "date", label: "Date Picker" },
];

function FormField({ field, index, removeField, updateField }) {
  return (
    <div className="p-2 border border-green-500 rounded mb-2 bg-black flex items-center justify-between">
      <label className="text-green-400">{field.label}</label>
      <input
        type={field.type}
        className="p-1 bg-gray-900 text-white border border-green-400 rounded"
        placeholder={`Enter ${field.label}`}
        value={field.value || ""}
        onChange={(e) => updateField(index, e.target.value)}
      />
      <button onClick={() => removeField(index)} className="bg-red-500 px-2 py-1 rounded text-black">❌</button>
    </div>
  );
}

export default function FormBuilder() {
  const [fields, setFields] = useState([]);

  const addField = (type) => {
    setFields([...fields, { type, label: type.charAt(0).toUpperCase() + type.slice(1), value: "" }]);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].value = value;
    setFields(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Data: " + JSON.stringify(fields, null, 2));
  };

  return (
    <div className="p-4 border border-green-500 rounded bg-[#101820] text-white">
      <h2 className="text-green-400 text-xl mb-4">🔥 Form Builder</h2>
      <div className="mb-4 flex gap-2">
        {fieldTypes.map((field) => (
          <button key={field.type} onClick={() => addField(field.type)} className="bg-blue-500 px-2 py-1 rounded text-black">
            ➕ {field.label}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="border border-green-500 p-4 rounded">
        {fields.map((field, index) => (
          <FormField key={index} field={field} index={index} removeField={removeField} updateField={updateField} />
        ))}
        <button type="submit" className="mt-4 bg-yellow-500 px-4 py-2 rounded text-black">Submit Form</button>
      </form>
    </div>
  );
}
