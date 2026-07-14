import { useForm } from "react-hook-form";

type FormData = {
  name: string;
};

export default function Test() {
  const { register, handleSubmit, watch } = useForm<FormData>();

  console.log("Watch:", watch());

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log("Submitted:", data);
      })}
    >
      <input
        {...register("name")}
        placeholder="Enter name"
      />

      <button type="submit">
        Submit
      </button>
    </form>
  );
}