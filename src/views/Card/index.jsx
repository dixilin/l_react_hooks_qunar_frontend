import React, { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import DateNav from "@/components/DateNav/DateNav";
import Content from "./components/Content";
import TicketList from "./components/TicketList";
import Calender from "./components/Calender";
import { connect } from "react-redux";
import {baseUrl} from '@/config'

const Card = (props) => {
  const [ticketInfos, setTicketInfos] = useState([]);
  const [content, setContent] = useState({});
  const [flag, setFlag] = useState(true);
  const { cardSearch } = props;
  useEffect(() => {
    if (cardSearch) {
      fetch(`${baseUrl}/getCardData/?${cardSearch}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.code === 0) {
          setTicketInfos(json.datas[0].ticketInfos);
          setContent(json.datas[0].train);
        }
      });
    }
    // eslint-disable-next-line
  }, [cardSearch]);
  return (
    <div style={{ background: "#f5f5f5", height: "100vh" }}>
      <Header title={content.trainNumber} />
      <DateNav history={props.history} />
      <Content content={content} flag={flag} setFlag={setFlag} />
      <TicketList ticketInfos={ticketInfos} />
      <Calender stations={content.stations} flag={flag} setFlag={setFlag} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedDate: state.home.selectedDate,
    cardSearch: state.home.cardSearch,
  };
};

export default connect(mapStateToProps)(Card);
