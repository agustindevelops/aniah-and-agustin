"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CardWrapper from "@/components/Card/CardWrapper";
import Spinner from "@/components/Spinner";
import { CATEGORIES } from "@/components/Potluck/constants";
import { scrollFocusedFieldIntoView } from "@/utils/scrollFocusedFieldIntoView";
import classNames from "classnames";

const ERROR_TEXT =
  "Oops! Something Went Wrong. Please feel free to blame Agustin for writing bad code.";

export default function PotluckForm({ entry, onClose, onSuccess }) {
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: entry?.name ?? "",
      item: entry?.item ?? "",
      category: entry?.category ?? "",
    },
  });

  const values = watch();
  const isDirty = entry
    ? values.name !== entry.name ||
      values.item !== entry.item ||
      values.category !== entry.category
    : false;
  const fieldId = (field) => (entry ? `edit-${field}` : field);

  const onSubmit = async (formData) => {
    if (entry && !isDirty) return;

    try {
      setIsLoading(true);
      const response = entry
        ? await axios.patch("/api/potluck", { id: entry.id, ...formData })
        : await axios.post("/api/potluck", formData);

      if (response.status === 200) {
        setErr("");
        if (!entry) reset();
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

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      const { status } = await axios.delete("/api/potluck", {
        data: { id: entry.id },
      });

      if (status === 200) {
        setErr("");
        onSuccess();
      } else {
        setErr(ERROR_TEXT);
      }
    } catch (e) {
      console.log(e);
      setErr(ERROR_TEXT);
    } finally {
      setIsDeleting(false);
    }
  };

  const fieldLabel = "block text-base font-medium text-stone-800";
  const fieldInput =
    "mt-1.5 block w-full rounded-xl border border-orange-200 bg-white px-3 py-2.5 text-base text-stone-900 shadow-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-300";

  return (
    <CardWrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onFocusCapture={entry ? undefined : scrollFocusedFieldIntoView}
        className="space-y-4"
      >
        {entry ? (
          <div className="flex items-start justify-between gap-3">
            <h2 id="edit-potluck-title" className="text-2xl font-bold text-stone-900">
              Edit your dish
            </h2>
            <button
              type="button"
              aria-label="Close"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl leading-none text-stone-500 hover:bg-orange-100 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-700"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        ) : null}
        <div>
          <label htmlFor={fieldId("name")} className={fieldLabel}>
            Your name
          </label>
          <input
            id={fieldId("name")}
            type="text"
            placeholder="Agustin is awesome!"
            {...register("name", { required: "Name is required" })}
            className={fieldInput}
          />
          {errors.name && (
            <p className="mt-1 text-sm italic text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={fieldId("item")} className={fieldLabel}>
            What are you bringing?
          </label>
          <input
            id={fieldId("item")}
            type="text"
            placeholder="Pumpkin pie"
            {...register("item", { required: "Item is required" })}
            className={fieldInput}
          />
          {errors.item && (
            <p className="mt-1 text-sm italic text-red-600">
              {errors.item.message}
            </p>
          )}
        </div>

        <fieldset>
          <legend className={fieldLabel}>Pick a category</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {CATEGORIES.map(({ label, value, choiceClass }) => (
              <label key={`category-value-${value}`} className="cursor-pointer">
                <input
                  type="radio"
                  value={value}
                  className="peer sr-only"
                  {...register("category", {
                    required: "Pick a category",
                  })}
                />
                <span
                  className={classNames(
                    "flex min-h-11 items-center justify-center rounded-xl border-2 px-2 py-2 text-center text-sm font-medium transition peer-focus-visible:ring-2 peer-focus-visible:ring-orange-700 peer-focus-visible:ring-offset-2 peer-checked:shadow-md sm:text-base",
                    choiceClass
                  )}
                >
                  {label}
                </span>
              </label>
            ))}
          </div>
          {errors.category && (
            <p className="mt-2 text-sm italic text-red-600">
              {errors.category.message}
            </p>
          )}
        </fieldset>
        {err ? (
          <h3 className="text-base font-bold text-red-600">
            {err}
          </h3>
        ) : null}
        <div className="flex flex-col gap-2">
          <button
            disabled={isLoading || isDeleting || (Boolean(entry) && !isDirty)}
            type="submit"
            className={`w-full rounded-xl px-6 py-2.5 text-base font-medium text-white shadow-md transition focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 disabled:cursor-not-allowed ${
              isLoading || (entry && !isDirty) ? "bg-green-300" : "bg-green-700 hover:bg-green-800"
            }`}
          >
            {isLoading ? <Spinner /> : entry ? "Update" : "Add to the table"}
          </button>
          {entry ? (
            confirmingDelete ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={isDeleting}
                  className="flex-1 rounded-xl bg-red-700 px-4 py-2.5 text-base font-medium text-white shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 disabled:bg-red-300"
                  onClick={confirmDelete}
                >
                  {isDeleting ? <Spinner /> : "Yes I am sure"}
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  className="flex-1 rounded-xl border-2 border-stone-300 bg-white px-4 py-2.5 text-base font-medium text-stone-800 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 disabled:opacity-60"
                  onClick={() => setConfirmingDelete(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                disabled={isLoading || isDeleting}
                className="w-full rounded-xl border-2 border-red-700 px-6 py-2.5 text-base font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 disabled:opacity-60"
                onClick={() => setConfirmingDelete(true)}
              >
                Delete
              </button>
            )
          ) : null}
        </div>
      </form>
    </CardWrapper>
  );
}
