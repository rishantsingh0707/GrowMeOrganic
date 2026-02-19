import { useState } from 'react';

interface Props {
  onSelect: (count: number) => void;
}

const CustomSelectionOverlay = ({ onSelect }: Props) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    const count = parseInt(value);
    if (!count || count <= 0) return;

    onSelect(count);
    setValue('');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter number of rows"
      />
      <button onClick={handleSubmit}>Select</button>
    </div>
  );
};

export default CustomSelectionOverlay;
