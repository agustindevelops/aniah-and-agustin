"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Christmas from "@/components/Card/Christmas";
import Spinner from "@/components/Spinner";
import { CATEGORIES } from "@/components/Potluck/constants";

const ERROR_TEXT =
  "Oops! Something Went Wrong. Please feel free to blame Agustin for writing bad code.";

export default function PotluckForm({ onSuccess }) {
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      const { status } = await axios.post("/api/potluck", formData);

      if (status === 200) {
        setErr("");
        reset();
        onSuccess();
      } else {
        setErr(ERROR_TEXT);
      }
    } catch (e) {
      console.log(e);
      setErr(ERROR_TEXT);
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
            {CATEGORIES.map(({ label, value }) => (
              <option key={`category-value-${value}`} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs italic">
              {errors.category.message}
            </p>
          )}
        </div>
        {err ? (
          <h3 className="text-red-500 text-lg font-bold">{err}</h3>
        ) : (
          <></>
        )}
        <div className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className={`px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 shadow-sm transition duration-200 ease-in-out ${
              isLoading ? "bg-green-300" : "hover:bg-green-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {isLoading ? <Spinner /> : "Submit"}
          </button>
        </div>
      </form>
    </Christmas>
  );
}
