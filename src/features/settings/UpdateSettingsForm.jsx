import useUpdateSetting from "./useUpdateSetting";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";


function UpdateSettingsForm() {
  const { isLoading, error, settings } = useSettings();
  const { isEditing, updateSetting } = useUpdateSetting();

  function onSubmit(data) {
    console.log("onSubmit", data);
    updateSetting(data);
  }

  function onError(errors) {
    // console.log("onError", errors);
  }

  function handleUpdate(key, value) {
    console.log("handleUpdate", key, value);
    updateSetting({ [key]: value });
  }



  if (isLoading) return <Spinner />;

  return (
    // <Form onSubmit={handleSubmit(onSubmit, onError)}>
    <Form >
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={settings?.minBookingLength}
          onBlur={(e) => handleUpdate("minBookingLength", e.target.value)}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={settings?.maxBookingLength}
          onBlur={(e) => handleUpdate("maxBookingLength", e.target.value)}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestPerBooking"
          defaultValue={settings?.maxGuestPerBooking}
          onBlur={(e) => handleUpdate("maxGuestPerBooking", e.target.value)}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={settings?.breakfastPrice}
          onBlur={(e) => handleUpdate("breakfastPrice", e.target.value)}
          disabled={isEditing}
        />
      </FormRow>
      {/* <FormRow>
          <Button>Update settings</Button>
      </FormRow> */}
    </Form>
  );
}

export default UpdateSettingsForm;
