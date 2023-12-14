import React from "react";
import Gender from "../components/gender";
import Exam from "../components/exam";
import SocialStatus from "../components/socialstatus";
import InfoSource from "../components/infosource";
import States from "../components/states";
import Courses from "../components/courses";
import Campus from "../components/campus";
import District from "../components/district";
import City from "../components/city";
import Entrance from "../components/entrance";
import EntranceCities from "../components/entrancecities";
import Programmes from "../components/programmes";
import Transactions from "../components/transactions";
import Jee from "../components/jee";

const Page = ({ params }) => {
  switch (params.section) {
    case "gender":
      return <Gender />;
    case "socialstatus":
      return <SocialStatus />;
    case "infosource":
      return <InfoSource />;
    case "states":
      return <States />;
    case "district":
      return <District />;
    case "city":
      return <City />;
    case "courses":
      return <Courses />;
    case "campus":
      return <Campus />;
    case "exam":
      return <Exam />;
    case "entrance":
      return <Entrance />;
    case "entrancecities":
      return <EntranceCities />;
    case "programmes":
      return <Programmes />;
    case "transactions":
      return <Transactions />;
    case "jee":
      return <Jee />;
    default:
      return <div>Section does not exists</div>;
  }
};

export default Page;
