"use client";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import CardWrapper from "@/components/Card/CardWrapper";
import Spinner from "@/components/Spinner";
import { CATEGORIES } from "@/components/Potluck/constants";
import classNames from "classnames";

const ERROR_TEXT =
  "Oops! Something Went Wrong. Please feel free to blame Agustin for writing bad code.";

const KEYBOARD_GAP = 16;

function isTextField(field) {
  return field instanceof HTMLInputElement && field.type !== "radio" && field.type !== "checkbox";
}

function scrollFieldAboveKeyboard(field) {
  const viewport = window.visualViewport;
  const rect = field.getBoundingClientRect();
  const visibleBottom = viewport
    ? viewport.offsetTop + viewport.height - KEYBOARD_GAP
    : window.innerHeight - KEYBOARD_GAP;

  if (rect.bottom <= visibleBottom && rect.top >= KEYBOARD_GAP) return;

  const top = window.scrollY + rect.bottom - (viewport?.height ?? window.innerHeight) + KEYBOARD_GAP;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export default function PotluckForm({ onSuccess }) {
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const form = formRef.current;
    const viewport = window.visualViewport;
    if (!form || !viewport) return;

    const liftFocusedField = () => {
      const active = document.activeElement;
      if (isTextField(active) && form.contains(active)) {
        scrollFieldAboveKeyboard(active);
      }
    };

    viewport.addEventListener("resize", liftFocusedField);
    return () => viewport.removeEventListener("resize", liftFocusedField);
  }, []);

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

  const fieldLabel = "block text-base font-medium text-stone-800";
  const fieldInput =
    "mt-1.5 block w-full scroll-mb-[45dvh] rounded-xl border border-orange-200 bg-white px-3 py-2.5 text-base text-stone-900 shadow-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-300";

  return (
    <CardWrapper>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        onFocus={(event) => {
          if (!isTextField(event.target)) return;
          const field = event.target;
          window.setTimeout(() => scrollFieldAboveKeyboard(field), 300);
        }}
        className="space-y-4 max-sm:focus-within:pb-[50dvh]"
      >
        <div>
          <label htmlFor="name" className={fieldLabel}>
            Your name
          </label>
          <input
            id="name"
            name="name"
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
          <label htmlFor="item" className={fieldLabel}>
            What are you bringing?
          </label>
          <input
            id="item"
            name="item"
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
        <div className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className={`w-full rounded-xl px-6 py-2.5 text-base font-medium text-white shadow-md transition focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 ${
              isLoading ? "bg-green-300" : "bg-green-700 hover:bg-green-800"
            }`}
          >
            {isLoading ? <Spinner /> : "Add to the table"}
          </button>
        </div>
      </form>
    </CardWrapper>
  );
}
