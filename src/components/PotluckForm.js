"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PotluckForm() {
  const [err, setErr] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const { data, status } = await axios.post("/api/potluck", formData);

      if (status === 200) {
        router.refresh();
        setErr("");
        reset();
      }
    } catch (e) {
      console.log(e);
      setErr("Oops Something Went Wrong! Blame Agustin for writing bad code.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-4 rounded-md shadow-md"
    >
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
          type="submit"
          className="px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
