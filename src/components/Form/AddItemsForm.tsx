import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { iCategories } from "../../interface";
import { useNavigate } from "react-router-dom";

export default function AddItemsForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [categories, setCategories] = useState<iCategories[]>();
  const [step, setStep] = useState(1);
  const [dataSubmitted, setDataSubmitted] = useState<FieldValues>();
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  const handleFormSubmit = async (data: FieldValues) => {
    setIsValid(true);
    const params = {
      ...data,
      ...dataSubmitted,
    };
    try {
      await axios.post("/api/items", params);
    } catch (e) {
      console.log(e);
    } finally {
      navigate("/success");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const getCategories = async () => {
    try {
      const res = await axios.get("/api/item-categories");
      setCategories(res?.data?.payload?.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleNext = () => {
    handleSubmit((data) => {
      if (Object.keys(errors).length === 0) {
        setDataSubmitted(data);
        setStep(step + 1);
        setIsValid(true);
        return;
      }
    })();
    setIsValid(false);
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <h3 className="mb-5">{step == 1 ? "Add" : "Review"} Item</h3>
      <Row>
        <Col sm={step === 1 ? "10" : "8"}>
          {!isValid && (
            <div className="alert alert-danger">
              Please fill in all required fields.
            </div>
          )}
        </Col>
      </Row>
      {step === 1 && (
        <Row className="gx-5 gy-4">
          <Col sm="5">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                {...register("name", {
                  required: true,
                })}
                type="text"
                name="name"
              />
            </Form.Group>
          </Col>
          <Col sm="5">
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                required
                {...register("quantity", {
                  required: true,
                })}
                type="number"
                name="quantity"
              />
            </Form.Group>
          </Col>
          <Col sm="5">
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                {...register("price", {
                  required: true,
                })}
                type="number"
                name="price"
              />
            </Form.Group>
          </Col>
          <Col sm="5">
            <Form.Group controlId="stockedDate">
              <Form.Label>Stocked Date</Form.Label>
              <Form.Control
                required
                {...register("stockedDate", {
                  required: true,
                })}
                type="date"
                name="stockedDate"
              />
            </Form.Group>
          </Col>
          <Col sm="5">
            <Form.Group controlId="condition">
              <Form.Label>Condition</Form.Label>
              <Form.Select
                required
                {...register("condition", {
                  required: true,
                })}
                defaultValue={""}
                name="condition"
              >
                <option disabled value="">
                  Select Condition
                </option>
                <option value="NEW">New</option>
                <option value="SECOND">Second</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col sm="5">
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Select
                required
                {...register("category", {
                  required: true,
                })}
                defaultValue=""
              >
                <option disabled value="">
                  Select Category
                </option>
                {categories?.map((e, index: number) => {
                  return <option key={index}>{e?.name}</option>;
                })}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      )}
      {step == 2 && (
        <Row className="gy-4  w-50">
          <Col sm="6">
            <div className="label-title">Name</div>
            <div className="fw-light">{dataSubmitted?.name}</div>
          </Col>
          <Col sm="6">
            <div className="label-title">Quantity</div>
            <div className="fw-light">{dataSubmitted?.quantity}</div>
          </Col>
          <Col sm="6">
            <div className="label-title">Price</div>
            <div className="fw-light">{dataSubmitted?.price}</div>
          </Col>
          <Col sm="6">
            <div className="label-title">Stocked Date</div>
            <div className="fw-light">{dataSubmitted?.stockedDate}</div>
          </Col>
          <Col sm="6">
            <div className="label-title">Condition</div>
            <div className="fw-light">{dataSubmitted?.condition}</div>
          </Col>
          <Col sm="6">
            <div className="label-title">Category</div>
            <div className="fw-light">{dataSubmitted?.category}</div>
          </Col>
        </Row>
      )}
      <Row className="mt-4">
        <Col sm={step === 1 ? "10" : "6"}>
          {step === 1 && (
            <Button
              variant="primary"
              className="mt-3  float-end"
              onClick={handleNext}
              type={"button"}
            >
              <div className="d-flex align-items-center text-white justify-content-center gap-3">
                Next
                <svg
                  width="10"
                  height="20"
                  viewBox="0 0 15 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.732236 24.7678C-0.244079 23.7914 -0.244079 22.2085 0.732236 21.2322L8.9645 13L0.732236 4.76768C-0.244079 3.79137 -0.244079 2.20845 0.732236 1.23214C1.70855 0.255819 3.29147 0.255819 4.26778 1.23214L14.2678 11.2322C15.2441 12.2085 15.2441 13.7914 14.2678 14.7677L4.26778 24.7678C3.29147 25.7441 1.70855 25.7441 0.732236 24.7678Z"
                    fill="white"
                  />
                </svg>
              </div>
            </Button>
          )}
          {step === 2 && (
            <Button
              variant="primary"
              className="mt-3  float-end"
              type={"submit"}
            >
              <div className="d-flex align-items-center text-white justify-content-center gap-3">
                Submit
              </div>
            </Button>
          )}
          <Button
            onClick={handleCancel}
            variant="primary"
            className="mt-3 bg-transparent text-primary  border-0 me-3 float-end"
            type="button"
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
