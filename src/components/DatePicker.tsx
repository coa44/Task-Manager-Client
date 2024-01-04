import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  value: Date | null;
  onChange: (value: Date | null) => void;
  input: React.ReactNode;
}

const DatePicker = (props: DatePickerProps) => {
  const { value, onChange, input } = props;

  return (
    <ReactDatePicker
      dateFormat="dd.MM.yyyy"
      selected={value}
      onChange={onChange}
      customInput={input}
      wrapperClassName=""
    />
  );
};

export default DatePicker;
