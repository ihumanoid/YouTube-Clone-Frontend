import ESurvey from "@/components/evideodisplay/ESurvey";
import React from "react";

function page({ params }: { params: { experimentId: string } }) {
  return <ESurvey experimentId={params.experimentId} />;
}

export default page;
