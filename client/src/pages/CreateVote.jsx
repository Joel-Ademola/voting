import React, { useState, useContext } from "react";
import { Navbar, Loader, HomeButton, BackHome } from "../components";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { Context } from "../context/index.jsx";
import { BsInfoCircle } from "react-icons/bs";
import { checkIfImage } from "../utils";

const Input = ({
  placeholder,
  isTextArea,
  name,
  type,
  value,
  inputType,
  handleChange,
  labelName,
}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={(e) => handleChange(e, name)}
          type={inputType}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-white bg-[#ffffffcb] font-epilogue text-[#4b5264] text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input
          required
          value={value}
          onChange={(e) => handleChange(e, name)}
          type={inputType}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-white bg-[#ffffffcb] font-epilogue text-[#4b5264] text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  );
};


const CreateVote = () => {
  const {
    formState,
    currentAccount,
    setFormData,
    createVote,
    handleChanges,
    isLoading,
  } = useContext(Context);
  // const [ setFormState] = useState([]);
  const [option, setOption] = useState([]);
  const handleAdd = () => {
    const abc = [...option, []];
    setOption(abc);
  };
  const handleChange = (event, index) => {
    const newOptions = [...formState.options];
    newOptions[index] = event.target.value;
    setFormData((prevState) => ({
      ...prevState,
      options: newOptions,
    }));
  };
  const handleDelete = (i) => {
    const deletOption = [...option];
    deletOption.splice(i, 1);
    setOption(deletOption);
  };
  const handleSubmit = (e) => {
    const { title, description, deadline, image, options } = formState;
    if (!title || !description || !options.length || !deadline || !image) {
      alert("Please fill in all required fields.");
      return;
    }
    if (options.length < 2)
      return window.confirm("Please add more than options.");

    e.preventDefault();

    checkIfImage(formState.image, async (exists) => {
      // if (!creator || !title || !description || !options || !deadline || !image)
      //   return "Please fill all the fields";
      if (exists) {
        {
          isLoading && <Loader />;
          console.log(isLoading);
        }
        createVote(title, description, deadline, image, options);
      } else {
        alert("Provide valid image URL");
        setFormData({ ...formState, image: "" });
      }
      // console.log(formState);
    });
  };
  // });

  return (
    <>
      <BackHome />
      <div className="gradient-bg-welcome min-h-screen">
        {currentAccount ? (
          <Navbar />
        ) : (
          <h3 className="text-white text-3xl text-center my-2"></h3>
        )}
        <div className=" bg-[#6b263e52] rounded-[20px] flex justify-center items-center flex-col sm:p-10 p-4 min-h-screen">
          <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-white rounded-[10px]">
            <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px]">
              Start a Vote
            </h1>
          </div>
          <div className="w-full mt-[65px] flex flex-col gap-[30px]">
            <div className="flex flex-wrap gap-[40px]">
              {/* <Input
                required
                labelName="Your Name *"
                placeholder="John Doe"
                name="creator"
                type="text"
                // value={formState.creator}
                handleChange={(e) => handleChanges(e, "creator")}
              /> */}
              <Input
                required
                labelName="Vote Title *"
                placeholder="write a title"
                name="title"
                type="text"
                // value={formState.title}
                handleChange={(e) => handleChanges(e, "title")}
              />
              <Input
                required
                labelName="Description *"
                placeholder="Write your description here"
                name="description"
                type="text"
                // value={formState.description}
                isTextArea
                rows={10}
                handleChange={(e) => handleChanges(e, "description")}
              />
            </div>
            <div className="flex flex-wrap gap-[40px]">
              <div>
                <button
                  className={
                    "font-epilogue font-semibold bg-[#1dc071] my-3 text-[16px] leading-[26px] text-white min-h-[45px] px-4 rounded-[10px] ${styles}"
                  }
                  onClick={handleAdd}
                >
                  Add Options
                </button>

                {option.map((option, i) => (
                  <div key={i}>
                    <input
                      required
                      // value={option}
                      onChange={(e) => handleChange(e, i)}
                      className="py-[8px] sm:px-[25px] px-[15px] outline-none border-[1px] border-white bg-[#ffffffcb] font-epilogue text-[#4b5264] text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
                    />
                    <button
                      className={
                        "font-epilogue font-semibold bg-red-500 text-20px mx-2 my-3 leading-[26px] text-white text  px-2 rounded-[10px]"
                      }
                      onClick={() => handleDelete(i)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
              <Input
                required
                labelName="End Date *"
                placeholder="End Date"
                inputType="date"
                name="deadline"
                // value={formState.deadline}
                handleChange={(e) => handleChanges(e, "deadline")}
              />
            </div>
            <Input
              required
              labelName="Image URL *"
              placeholder="Image URL"
              name="image"
              type="text"
              // value={formState.image}
              handleChange={(e) => handleChanges(e, "image")}
            />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading ? (
              <Loader />
            ) : (
              <div className="flex justify-center items-center">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="font-epilogue bg-[#1dc071] font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]"
                >
                  {isLoading === true}
                  Send now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateVote;
