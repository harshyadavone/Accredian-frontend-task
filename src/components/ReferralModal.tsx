import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Cancel01Icon, Loading03Icon } from "./icons";
import { useReferralSubmit } from "../hooks/useReferralSubmit";

interface ReferralModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  referrerName: string;
  referrerEmail: string;
  refereeName: string;
  refereeEmail: string;
  course: string;
}

const courses = [
  "Web Development",
  "Data Science",
  "UX Design",
  "Machine Learning",
  "Mobile App Development",
];

const ReferralModal: React.FC<ReferralModalProps> = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const { submitReferral, isSubmitting, submitStatus } = useReferralSubmit(
    reset,
    onClose
  );

  const onSubmit: SubmitHandler<FormData> = (data) => {
    submitReferral(data);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-20">
      <div className="relative p-8 border w-full max-w-md shadow-lg rounded-md bg-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          aria-label="Close modal"
        >
          <Cancel01Icon className="h-6 w-6" />
        </button>
        <div className="mt-3">
          <h3 className="text-2xl leading-6 font-bold text-gray-900 mb-4">
            Refer a Friend
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              id="referrerName"
              label="Your Name"
              register={register}
              errors={errors}
              validationRules={{ required: "Your name is required" }}
            />
            <FormField
              id="referrerEmail"
              label="Your Email"
              register={register}
              errors={errors}
              validationRules={{
                required: "Your email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email",
                },
              }}
            />
            <FormField
              id="refereeName"
              label="Friend's Name"
              register={register}
              errors={errors}
              validationRules={{ required: "Friend's name is required" }}
            />
            <FormField
              id="refereeEmail"
              label="Friend's Email"
              register={register}
              errors={errors}
              validationRules={{
                required: "Friend's email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email for your friend",
                },
              }}
            />
            <div>
              <label
                htmlFor="course"
                className="block text-sm font-medium text-gray-700"
              >
                Course
              </label>
              <select
                id="course"
                {...register("course", { required: "Please select a course" })}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              {errors.course && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.course.message}
                </p>
              )}
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loading03Icon className="animate-spin h-5 w-5 mr-3" />
                    Submitting...
                  </>
                ) : (
                  "Submit Referral"
                )}
              </button>
            </div>
          </form>
          {submitStatus === "success" && (
            <p className="mt-4 text-sm text-green-600">
              Referral submitted successfully!
            </p>
          )}
          {submitStatus === "error" && (
            <p className="mt-4 text-sm text-red-600">
              An error occurred. Please try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

interface FormFieldProps {
  id: keyof FormData;
  label: string;
  register: any;
  errors: any;
  validationRules: any;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  register,
  errors,
  validationRules,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      {...register(id, validationRules)}
      className="mt-1 pl-2 py-2 border border-gray-300 block w-full rounded-md focus:outline-none focus:border-gray-500"
    />
    {errors[id] && (
      <p className="mt-1 text-sm text-red-600">{errors[id].message}</p>
    )}
  </div>
);

export default ReferralModal;
