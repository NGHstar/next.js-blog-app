"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { buttonVariants } from "../../../components/ui/button";

function FetchDataTest() {
  // ---
  const tasks = useQuery(api.tasks.get);

  if (!tasks)
    return <p className="text-amber-500 text-2xl">loading...</p>;

  return (
    <div className="flex min-h-screen flex-col items-center mt-24 space-y-2">
      {tasks?.map(({ _id, text, isCompleted }) => (
        <div
          className={buttonVariants({ variant: "outline" })}
          key={_id}
        >
          {text}
          {isCompleted ? " | true" : " | false"}
        </div>
      ))}
    </div>
  );
}

export default FetchDataTest;
