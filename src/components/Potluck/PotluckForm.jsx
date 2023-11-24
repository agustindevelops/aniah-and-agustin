"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Christmas from "@/components/Card/Christmas";

export default function PotluckForm() {
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      const { data, status } = await axios.post("/api/potluck", formData);

      if (status === 200) {
        router.refresh();
        setErr("");
        reset();
      }
    } catch (e) {
      console.log(e);
      setErr("Oops Something Went Wrong! Blame Agustin for writing bad code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Christmas>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Your Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="item"
            className="block text-sm font-medium text-gray-700"
          >
            Potluck Item
          </label>
          <input
            id="item"
            name="item"
            type="text"
            {...register("item", { required: "Item is required" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.item && (
            <p className="text-red-500 text-xs italic">{errors.item.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            {...register("category", { required: "Category is required" })}
            className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a category...</option>
            <option value="main-dish">Main Dish</option>
            <option value="appetizers">Appetizers</option>
            <option value="sides">Sides</option>
            <option value="dessert">Dessert</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs italic">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className={`px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 shadow-sm transition duration-200 ease-in-out ${
              isLoading ? "bg-green-300" : "hover:bg-green-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isLoading ? (
              <svg
                className="animate-spin mx-auto h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0116 0H4z"
                ></path>
              </svg>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </Christmas>
  );
}
