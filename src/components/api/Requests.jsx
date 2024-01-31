import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import scss from "../api/Style.module.scss";

const link =
  "https://elchocrud.pro/api/v1/890da908a9ba0615e1cb7a0692c29808/practice";

const Requests = () => {
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [deadline, setDeadline] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const handleAdded = async () => {
    const newDate = {
      id: Math.floor(Math.random()),
      name: name,
      image: image,
      deadline: deadline,
    };
    setName("");
    setImage("");
    setDeadline("");
    try {
      const response = await axios.post(link, newDate);
      setData(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const getRequest = async () => {
    try {
      const response = await axios.get(link);
      setData(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  const deleteRequest = async (id) => {
    try {
      const response = await axios.delete(`${link}/${id}`);
      setData(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const upDatedRequest = async (id) => {
    try {
      await axios.put(`${link}/${id}`, {
        name: newTitle,
        image: newImage,
        deadline: newDeadline,
      });
      const upDated = data.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            name: newTitle,
            image: newImage,
            deadline: newDeadline,
          };
        }
        return item;
      });
      setData(upDated);
      setUserId(null);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteAllRequest = async () => {
    try {
      const response = await axios.delete(link);
      setData(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={scss.content}>
      <div className={scss.form}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="iamge"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <div className={scss.divedBtn}>
          <div onClick={handleAdded} className={scss.added}>
            <div>Добавить</div>
          </div>

          <div onClick={deleteAllRequest} className={scss.del}>
            <div>Удалить все</div>
          </div>
        </div>
      </div>
      <div className={scss.container}>
        {data.map((item) => (
          <div className={scss.card} key={item.id}>
            {item._id === userId ? (
              <div className={scss.upForm}>
                <input
                  type="text"
                  placeholder="New Name"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="New Image"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                />
                <input
                  type="date"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                />
                <button onClick={() => setUserId(null)}>Отмена</button>
                <button onClick={() => upDatedRequest(item._id)}>
                  Сохранить
                </button>
              </div>
            ) : (
              <div className={scss.boxCard} key={item.id}>
                <h1>{item.name}</h1>
                <img src={item.image} alt={item.name} />
                <p>{item.deadline}</p>
                <div className={scss.boxBtn}>
                  <button onClick={() => deleteRequest(item._id)}>
                    Удалить
                  </button>
                  <button onClick={() => setUserId(item._id)}>
                    Редактировать
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
