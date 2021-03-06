import React, { useState } from "react";
import Card from "../cards/Card";
import { MdClose, MdEdit } from "react-icons/md";
import Modal from "../Modal";
import WidgetsEdit from "../cards/WidgetsEdit";

const JustSay = ({ list, onDelete, onEdit }) => {
  const [modalActiveEditJustSay, setModalActiveEditJustSay] = useState(false);

  const handleDelete = () => {
    onDelete(list);
  };

  const handleCancel = () => {
    setModalActiveEditJustSay(false);
  };

  const handleEdit = () => {
    setModalActiveEditJustSay(true);
  };

  const onEditSubmit = (id, value) => {
    onEdit(id, value);
    setModalActiveEditJustSay(false);
  };

  return (
    <>
      {modalActiveEditJustSay && (
        <Modal onCancel={handleCancel}>
          <WidgetsEdit
            title="Edit JustSay"
            onEditSubmit={onEditSubmit}
            list={list}
          />
        </Modal>
      )}
      <Card
        title="JustSay"
        key={list.id}
        list={list}
        closeBtn={<MdClose />}
        editBtn={<MdEdit />}
        onDelete={handleDelete}
        onEdit={handleEdit}
      >
        <div className="text-center mt-8 mb-12">
          <h1 className="text-4xl font-bold">{list.value}</h1>
        </div>
        <div className="mt-6 "></div>
      </Card>
    </>
  );
};

export default JustSay;
