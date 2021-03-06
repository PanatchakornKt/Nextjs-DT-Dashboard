import React, { useState, useEffect } from "react";
import WidgetsCard from "./cards/WidgetsCard";
import Card from "./cards/Card";
import AllSettings from "./AllSettings";
import Modal from "./Modal";
import Button from "./Button";

import JustSay from "./widgets/JustSay";
import JustShout from "./widgets/Justshout";
import Counter from "./widgets/Counter";
import Timer from "./widgets/Timer";
import Weather from "./widgets/Weather";
import Game from "./game/Game";

import CardJustSay from "./cards/CardJustsay";
import CardJustShout from "./cards/CardJustshout";
import CardCounter from "./cards/CardCounter";
import CardWeather from "./cards/CardWeather";

import { AiOutlineMessage } from "react-icons/ai";
import { IoTimerOutline } from "react-icons/io5";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import {
  RiAddCircleLine,
  RiIncreaseDecreaseLine,
  RiSettings3Line,
  RiDashboardLine,
} from "react-icons/ri";

const AllWidgets = () => {
  const [modalActiveMenu, setModalActiveMenu] = useState(false);
  const [modalActiveSettings, setModalActiveSettings] = useState(false);
  const [modalActiveJustSay, setModalActiveJustSay] = useState(false);
  const [modalActiveJustShout, setModalActiveJustShout] = useState(false);
  const [modalActiveCounter, setModalActiveCounter] = useState(false);
  const [modalActiveWeather, setModalActiveWeather] = useState(false);
  const [defaultJustShout, setDefaultJustShout] = useState([]);
  const [listAllWidgets, setListAllWidgets] = useState([]);

  const [selected, setSelected] = useState("");
  const [counter, setCounter] = useState("");
  const [timer, setTimer] = useState("");
  const [zero, setZero] = useState("");
  const [totalTimer, setTotalTimer] = useState("00:00");
  const disabled = false;

  const id = Math.floor(Math.random() * 1000) + 1;
  const date = new Date();
  const year = new Intl.DateTimeFormat("en", { year: "2-digit" }).format(date);
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
  const time = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
  const dateTime = `${month} ${day}, ${year}, ${time}`;

  const handleClick = () => {
    setModalActiveMenu(true);
  };

  const handleJustSay = () => {
    setModalActiveMenu(false);
    setModalActiveJustSay(true);
  };

  const handleJustShout = () => {
    setModalActiveMenu(false);
    setModalActiveJustShout(true);
  };

  const handleCounter = () => {
    setModalActiveMenu(false);
    setModalActiveCounter(true);
    setCounter();
  };

  const handleTimer = () => {
    setModalActiveMenu(false);
    setTimer("");
    handleCancel();
    const data = {
      value: "",
      id: id,
      date: dateTime,
      type: "timer",
    };
    setListAllWidgets([...listAllWidgets, data]);
  };

  const handleWeather = () => {
    setModalActiveMenu(false);
    setModalActiveWeather(true);
  };

  const handleGame = () => {
    setModalActiveMenu(false);
    handleCancel();
    const data = {
      value: "",
      id: id,
      date: dateTime,
      type: "game",
    };
    setListAllWidgets([...listAllWidgets, data]);
  };

  const handleSettings = () => {
    setModalActiveSettings(true);
  };

  const handleCancel = () => {
    setModalActiveMenu(false);
    setModalActiveJustSay(false);
    setModalActiveJustShout(false);
    setModalActiveCounter(false);
    setModalActiveWeather(false);
    setModalActiveSettings(false);
  };

  const handleDelete = (list) => {
    if (listAllWidgets.length > 0) {
      setListAllWidgets(
        listAllWidgets.filter((widget) => widget.id !== list.id)
      );
    }
    setDefaultJustShout("");
  };

  const handleClear = () => {
    setListAllWidgets([]);
    setModalActiveSettings(false);
    setDefaultJustShout("");
  };

  const onAdd = (type, value) => {
    const data = {
      id: id,
      date: dateTime,
      type,
      value,
    };
    if (type === "justSay") {
      listAllWidgets.map((widget) => {
        if (widget.type === "justSay") {
          widget = value;
        }
      });
      setListAllWidgets([...listAllWidgets, data]);
      handleCancel();
    } else if (type === "justShout") {
      setDefaultJustShout(value);
      listAllWidgets.map((widget) => {
        if (widget.type === "justShout") {
          widget.value = value;
        }
      });
      setListAllWidgets([...listAllWidgets, data]);
      handleCancel();
    } else if (type === "weather") {
      listAllWidgets.map((widget) => {
        if (widget.type === "weather") {
          widget = value;
        }
      });
      setListAllWidgets([...listAllWidgets, data]);
      handleCancel();
    } else if (type === "noWeather") {
      listAllWidgets.map((widget) => {
        if (widget.type === "noWeather") {
          widget = value;
        }
      });
      setListAllWidgets([...listAllWidgets, data]);
      handleCancel();
    }
  };

  const onEdit = (newId, newValue) => {
    const newlistAllWidgets = [];
    listAllWidgets.map((data) => {
      if (data.id === newId) {
        data.value = newValue;
      }
      newlistAllWidgets.push(data);
    });
    setListAllWidgets(newlistAllWidgets);
  };

  const onEditJustShout = (newValue) => {
    const newlistAllWidgets = [];
    listAllWidgets.map((data) => {
      if (data.type === "justShout") {
        data.value = newValue;
        setDefaultJustShout(newValue);
      }
      newlistAllWidgets.push(data);
    });
    setListAllWidgets(newlistAllWidgets);
    setModalActiveSettings(false);
  };

  const onData = (newId, newType, newName) => {
    const newListAllWidgets = [];
    listAllWidgets.map((data) => {
      if (data.id === newId) {
        data.value = newName;
        data.type = newType;
      }
      newListAllWidgets.push(data);
    });
    setListAllWidgets(newListAllWidgets);
  };

  const mapNewData = (list, value) => {
    listAllWidgets.map((data) => {
      if (data.id === list.id) {
        return { ...data, value };
      } else {
        return data;
      }
    });
    let getTimer = listAllWidgets
      .filter((data) => data.type === "timer")
      .map((data) => data.value);
    if (getTimer.length != 0) {
      getTimer = getTimer.reduce((prev, next) => prev + next);
    }
    const min = ("0" + Math.floor((getTimer / 60000) % 60)).slice(-2);
    const sec = ("0" + Math.floor((getTimer / 1000) % 60)).slice(-2);
    setTotalTimer(min + ":" + sec);
  };

  useEffect(() => {
    getLocal();
  }, []);

  useEffect(() => {
    saveLocal();
  }, [listAllWidgets]);

  const saveLocal = () => {
    localStorage.setItem("listAllWidgets", JSON.stringify(listAllWidgets));
    localStorage.setItem("defaultJustShout", JSON.stringify(defaultJustShout));
  };
  const getLocal = () => {
    if (
      localStorage.getItem("listAllWidgets") === null ||
      localStorage.getItem("defaultJustShout") === null
    ) {
      localStorage.setItem("listAllWidgets", JSON.stringify([]));
      localStorage.setItem("defaultJustShout", JSON.stringify([]));
    } else {
      let Local = JSON.parse(localStorage.getItem("listAllWidgets"));
      let LocalJustShout = JSON.parse(localStorage.getItem("defaultJustShout"));
      setListAllWidgets(Local);
      setDefaultJustShout(LocalJustShout);
    }
  };

  const handleAddWidgets = () => {
    if (listAllWidgets.length > 0) {
      return listAllWidgets.map((list) => {
        if (list.type === "justSay") {
          return (
            <JustSay
              onEdit={onEdit}
              key={list.id}
              list={list}
              onDelete={handleDelete}
            />
          );
        } else if (list.type === "justShout") {
          return (
            <JustShout
              key={list.id}
              list={list}
              onDelete={handleDelete}
              onEditJustShout={onEditJustShout}
            />
          );
        } else if (list.type === "counter") {
          return (
            <Counter
              zero={zero}
              setZero={setZero}
              key={list.id}
              title={counter}
              list={list}
              onDelete={handleDelete}
            />
          );
        } else if (list.type === "timer") {
          return (
            <Timer
              totalTime={totalTimer}
              setTotalTimer={setTotalTimer}
              zero={zero}
              setZero={setZero}
              key={list.id}
              title={timer}
              list={list}
              onDelete={handleDelete}
              mapNewData={mapNewData}
            />
          );
        } else if (list.type === "weather" || list.type === "noWeather") {
          return (
            <Weather
              key={list.id}
              list={list}
              onDelete={handleDelete}
              onData={onData}
            />
          );
        } else if (list.type === "game") {
          return (
            <Game
              key={list.id}
              list={list}
              title={Game}
              onDelete={handleDelete}
            />
          );
        }
      });
    } else {
      return (
        <>
          <Card>
            <div className="text-center text-gray-400 my-8 font-light">
              <p className="text-4xl mb-2">No widgets at all </p>
              <p>
                Click{" "}
                <button
                  onClick={handleClick}
                  className="font-normal text-blue-400 focus:outline-none"
                >
                  {" "}
                  HERE{" "}
                </button>{" "}
                to add a new one
              </p>
            </div>
          </Card>
        </>
      );
    }
  };

  return (
    <>
      <h2 className="text-xl undefined">Widgets</h2>
      <div className="pt-3">
        <div className="mb-4 space-x-1">
          <Button doClick={handleClick} disabled={disabled}>
            <RiAddCircleLine className="inline-block text-xl relative -top-0.5" />{" "}
            Add Widget
          </Button>
          <Button
            doClick={handleSettings}
            checkColor="darkGray"
            disabled={!disabled}
          >
            <RiSettings3Line className="inline-block text-xl relative -top-0.5" />{" "}
            Settings
          </Button>
        </div>

        <div className="md:flex md:flex-wrap md:-mr-4">
          {handleAddWidgets()}
        </div>

        {modalActiveMenu && (
          <Modal onCancel={handleCancel}>
            <h2 className="text-xl undefined">Add widget</h2>
            <div className=" flex flex-wrap text-center mt-1.5 -ml-1.5">
              <div onClick={handleJustSay} className="w-1/3 pt-1.5 pl-1.5">
                <WidgetsCard title="JustSay">
                  <AiOutlineMessage className="mx-auto text-4xl" />
                </WidgetsCard>
              </div>
              <div onClick={handleJustShout} className="w-1/3 pt-1.5 pl-1.5">
                <WidgetsCard title="JustShout">
                  <HiOutlineSpeakerphone className="mx-auto text-4xl" />
                </WidgetsCard>
              </div>
              <div onClick={handleCounter} className="w-1/3 pt-1.5 pl-1.5">
                <WidgetsCard title="Counter">
                  <RiIncreaseDecreaseLine className="mx-auto text-4xl" />
                </WidgetsCard>
              </div>
              <div onClick={handleTimer} className="w-1/3 pt-1.5 pl-1.5">
                <WidgetsCard title="Timer">
                  <IoTimerOutline className="mx-auto text-4xl" />
                </WidgetsCard>
              </div>
              <div onClick={handleWeather} className="w-1/3 pt-1.5 pl-1.5">
                <WidgetsCard title="Weather">
                  <TiWeatherPartlySunny className="mx-auto text-4xl" />
                </WidgetsCard>
              </div>
              <div onClick={handleGame} className="w-1/3 pt-1.5 pl-1.5">
                <WidgetsCard title="Game">
                  <RiDashboardLine className="mx-auto text-4xl" />
                </WidgetsCard>
              </div>
            </div>
          </Modal>
        )}

        {modalActiveJustSay && (
          <Modal onCancel={handleCancel}>
            <CardJustSay onAdd={onAdd} />
          </Modal>
        )}

        {modalActiveJustShout && (
          <Modal onCancel={handleCancel}>
            <CardJustShout onAdd={onAdd} defaultJustShout={defaultJustShout} />
          </Modal>
        )}

        {modalActiveCounter && (
          <Modal onCancel={handleCancel}>
            <CardCounter
              setCounter={setCounter}
              handleAddWidgets={handleAddWidgets}
              handleCancel={handleCancel}
              setListAllWidgets={setListAllWidgets}
              listAllWidgets={listAllWidgets}
              dateTime={dateTime}
            />
          </Modal>
        )}

        {modalActiveWeather && (
          <Modal onCancel={handleCancel}>
            <CardWeather onAdd={onAdd} />
          </Modal>
        )}

        {modalActiveSettings && (
          <Modal onCancel={handleCancel}>
            <AllSettings
              handleClear={handleClear}
              listAllWidgets={listAllWidgets}
              onEditJustShout={onEditJustShout}
              defaultJustShout={defaultJustShout}
              totalTimer={totalTimer}
              setZero={setZero}
            >
              <div className="p-5 border-1 bg-white rounded-2xl relative mb-4">
                <h2 className="text-lg font-bold text-gray-400 mb-1.5">
                  Delete Zone
                </h2>
                <button
                  className="text-white focus:outline-none px-4 py-1 rounded-md bg-red-500 hover:bg-red-600 w-full mb-1"
                  onClick={handleClear}
                >
                  {" "}
                  Delete all widgets
                </button>
              </div>
            </AllSettings>
          </Modal>
        )}
      </div>
    </>
  );
};

export default AllWidgets;
