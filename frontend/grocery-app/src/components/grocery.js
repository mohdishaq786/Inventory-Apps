import React from "react";
import request from "superagent";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import backGround from "../images/backgrounds.png";
import FilterAction from "../Utility/filterAction";
import LoadingSpinner from "./spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url = "http://localhost:5000/api";

class Grocery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      name: "",
      quantity: "",
      unit: "",
      groceries: [],
      isModalOpen: false,
      isEditing: false,
      editingItemId: null,
      isDeleting: false,
      search: "",
      isLoading: false,
    };
    this.renderGroceryCard = this.renderGroceryCard.bind(this);
  }
  //lifecyle method
  componentDidMount() {
    this.loadGroceries();
  }
  //api calls from ui using superagent
  //GET CALL
  loadGroceries = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.setState({ isLoading: true });
    request
      .get(url + "/grocery")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${userInfo.token}`)
      .then((response) => {
        if (response.status === 200) {
          this.setState({ groceries: response.body, isLoading: false });
        } else {
          console.error(
            "Error fetching groceries. Status code:",
            response.status
          );
          toast.error(response.body.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching groceries:", error);
        this.setState({ isLoading: false });
      });
  };
  //post call
  handleAddItem = (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo.token, "userInfo--->>>>");

    const { name, quantity, unit } = this.state;
    this.setState({ isLoading: true });
    request
      .post(url + "/grocery/addGrocery")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${userInfo.token}`)
      .send({ name, quantity, unit })
      .then((response) => {
        if (response.body.error) {
          toast.error(response.body.error);
        } else {
          this.loadGroceries();
          this.closeModal();
          this.setState({ name: "", quantity: "", unit: " " });
          toast.success("Item added successfully");
        }
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.error("Error adding grocery:", error);
        toast.error("Error adding item");
        this.setState({ isLoading: false });
      });
  };
  //update call
  handleUpdateItem = (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const { _id, name, quantity, unit } = this.state;
    this.setState({ isLoading: true });
    request
      .put(url + `/grocery/${_id}`)
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${userInfo.token}`)

      .send({ name, quantity, unit })
      .then((response) => {
        if (response.body.error) {
          toast.error(response.body.error);
        } else {
          this.loadGroceries();
          this.closeModal();
          this.setState({ _id: "", name: "", quantity: "", unit: " " });
          toast.success("Item updated successfully");
        }
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.error("Error updating grocery:", error);
        toast.error("Error updating item");
        this.setState({ isLoading: false });
      });
  };
  //delet calll
  handleDeleteItem = (idToDelete) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    this.setState({ isLoading: true });
    request
      .delete(url + `/grocery/${idToDelete}`)
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${userInfo.token}`)
      .then((response) => {
        if (response.body.error) {
          toast.error(response.body.error);
        } else {
          toast.success("Item deleted successfully");
          this.loadGroceries();
        }
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        console.error("Error deleting grocery:", error);
        toast.error("Error deleting item");
        this.setState({ isLoading: false });
      });
  };
  //api calls from ui using superagent

  //modal code for add and edit inventory
  openAddModal = () => {
    this.setState({
      isModalOpen: true,
      isEditing: false,
      name: "",
      quantity: "",
      unit: "",
    });
  };

  openEditModal = (item) => {
    this.setState({
      isModalOpen: true,
      isEditing: true,
      _id: item._id,
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
    });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  ////modal code for add and edit inventory

  confirmDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      this.setState({ isDeleting: true });
      this.handleDeleteItem(item._id);
    }
  };
  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };
  //
  //card render logic
  renderGroceryCard(item) {
    const { search } = this.state;

    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) {
      return null;
    }

    return (
      <Col md={4} className="mb-4" key={item.id}>
        <Card
          className="h-100"
          style={{
            border: "none",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            transition: "transform 0.2s",
            cursor: "pointer",
            backgroundColor: "#fff", // Initial background color
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#bbb"; // Change background color on hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#fff"; // Reset background color on mouse leave
          }}
        >
          <Card.Img
            variant="top"
            src={FilterAction.getIcon(item.name)}
            style={{
              height: "200px",
              objectFit: "cover",
            }}
            alt={item.name}
          />
          <Card.Body>
            <Card.Title
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {item.name}
            </Card.Title>
            <Card.Text style={{ fontSize: "14px" }}>
              Quantity: {item.quantity} {item.unit}
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center">
              <Button
                variant="primary"
                onClick={() => this.openEditModal(item)}
              >
                Edit
              </Button>
              <Button variant="danger" onClick={() => this.confirmDelete(item)}>
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  }

  handleLogout = () => {
    localStorage.removeItem("userInfo"); // Remove user info from localStorage
    window.location.href = "/"; // Redirect to lsnding page
  };
  render() {
    const { search, groceries, isLoading } = this.state;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // const filteredGroceries = this.state.groceries.filter((item) =>
    //   item?.name?.toLowerCase().includes(search.toLowerCase())
    // );
    return (
      <Container>
        <div
          className="d-flex justify-content-end align-items-center"
          style={{ marginBottom: 20 }}
        >
          {userInfo && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>Welcome, {userInfo.name}</div>
              <Button
                variant="secondary"
                onClick={this.handleLogout}
                style={{ marginLeft: 15 }}
              >
                Logout
              </Button>{" "}
            </div>
          )}
        </div>
        <div
          className="text-center"
          style={{
            backgroundImage: `url(${backGround})`, // Replace with your header image path
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            padding: "10px 0", // Adjust padding as needed
            marginBottom: 20,
          }}
        >
          <h1 style={{ marginBottom: 50, display: "flex", color: "white" }}>
            Grocery Inventory
          </h1>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
        />
        <Row style={{ justifyContent: "space-between" }}>
          <Col
            xs={12}
            sm={6}
            md={6}
            lg={12}
            xl={6}
            style={{ marginBottom: 10 }}
          >
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search"
                value={search}
                onChange={this.handleSearchChange}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "0.25rem",
                  padding: "0.25rem",
                  width: "50%",
                }}
              />
            </Form.Group>
          </Col>
          <Col
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            style={{ marginBottom: 10, textAlign: "right" }}
          >
            <Button onClick={this.openAddModal}>Add Item</Button>
          </Col>
        </Row>
        <Row>
          {isLoading ? ( // Conditionally render the spinner
            <LoadingSpinner />
          ) : (
            groceries?.map((item) => this.renderGroceryCard(item))
          )}
        </Row>

        <Modal show={this.state.isModalOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.isEditing ? "Edit Item" : "Add Item"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={
                this.state.isEditing
                  ? this.handleUpdateItem
                  : this.handleAddItem
              }
            >
              <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Quantity:</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.quantity}
                  onChange={(e) => this.setState({ quantity: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Label>Measurement Unit:</Form.Label>
              <Form.Control
                as="select"
                value={this.state.unit}
                onChange={(e) => this.setState({ unit: e.target.value })}
                required
              >
                <option value="">Select Unit</option>
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
                <option value="pcs">pcs</option>
                <option value="litres">litres</option>
                {/* Add more options as needed */}
              </Form.Control>
              <Button style={{ marginTop: 10 }} type="submit">
                {this.state.isEditing ? "Save Changes" : "Add Item"}
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default Grocery;

const styles = {
  containerStyle: {
    // backgroundImage: `url(${backGround})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    // backgroundAttachment: "fixed",
  },
  spaceBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
