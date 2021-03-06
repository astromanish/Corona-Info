import React, { useState, useContext } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import axios from "axios";

import { AnswerContext } from "./AnswerContext";
import moment from 'moment';

const Answer = (props) => {
  const [ansNo, setAnsNo] = useContext(AnswerContext);
  console.log(ansNo);
  const question = props.question;
  const [isEditing, setIsEditing] = useState(false);
  const [editAns, setEditAns] = useState("");

  const editHandler = () => {
    setIsEditing(true);
  };

  const cnfrEditHandler = (question) => {
    axios({
      method: "patch",
      url: `https://karuna-go.herokuapp.com/answers/${question._id}/${props.ans._id}`,
      data: {
        a_body: editAns,
      },
      params: {
        ques_id: question._id,
      },
    })
      .then((res) => {
        setIsEditing(false);
        setAnsNo(ansNo - 1);
      })
      .catch((err) => console.error(err));
  };

  const deleteHandler = (question) => {
    console.log();
    axios({
      method: "delete",
      url: `https://karuna-go.herokuapp.com/answers/${question._id}/${props.ans._id}`,
      params: {
        ques_id: question._id,
      },
    })
      .then(() => {
        setAnsNo(ansNo - 1);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="d-item d-answers-each">
        <div className="d-user-details">
          <div className="d-user-details-2">
            <div className="d-user-details-icon">
              <i class="fa fa-user-circle" aria-hidden="true"></i>
            </div>
            <div className="d-user-details-2-name">
              {
                props.ans.writer_name && <div>{props.ans.writer_name}</div>
              }
              {/* <div>{props.ans.date_created && moment(props.ans.date_created).fromNow()}</div> */}
            </div>
          </div>
          <div className="d-edit-option">
            {props.ans && (
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => editHandler(props.question)}>
                    <i class="fa fa-cog" aria-hidden="true"></i> Edit
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => deleteHandler(props.question)}>
                    <i className="fa fa-trash" aria-hidden="true"></i> Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )
            }
          </div>
        </div>
        <div className="d-ques-body">
          {isEditing ? (
            <>
              <Form.Control as="textarea" rows="3" defaultValue={props.question.q_body}
                onChange={(e) => setEditAns(e.target.value)}></Form.Control>
              <br />
              <Button onClick={() => cnfrEditHandler(props.ques)}>
                Confirm Edit
            </Button>
            </>
          ) : (
              <>
                <span>{props.ans.a_body}</span>
              </>
            )}
        </div>
        <div className="d-ans-vote-setion">
          <div className="d-ques-vote-icons">
            <div className="d-ques-vote-up">
              <button><i className="fa fa-chevron-up" aria-hidden="true"></i></button>
            </div>
            <div className="d-ques-vote-down">
              <button><i className="fa fa-chevron-down" aria-hidden="true"></i></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Answer;
