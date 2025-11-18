import React from "react";
import AllEventContainer from "./_components/AllEventContainer";
import HeaderAndAddButton from "./_components/HeaderAndAddButton";

export default function AddEventsPage() {
  return (
    <div className="lg:space-y-6 space-y-4">
      <HeaderAndAddButton />
      <AllEventContainer />
    </div>
  );
}
