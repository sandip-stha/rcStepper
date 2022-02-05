import React, { useState } from "react";
import "./styles.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Collapse from "react-bootstrap/Collapse";
import Fade from "react-bootstrap/Fade";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faDesktop,
  faEdit,
  faMobile,
  faUserEdit,
  faPlusCircle,
  faTimes,
  faCheck,
  faExclamation,
  faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faCalendarAlt, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { Editor } from "@tinymce/tinymce-react";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Steps from "antd/es/steps";
import "antd/es/steps/style/css";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import PlaceAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import { SKILLS } from "./docs/skills";
// import { locationMYgroupedOptions1 } from "./docs/locationMYlevel1";
import { JOB_SPECIFICATIONS, ADMIN_ROLES } from "./docs/jobSpecifications";

import "./styles/_datepicker_custom.css";

function TopNav() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <span role="img" aria-label="">
            <Image src="https://via.placeholder.com/120x44/?text=Logo" />
          </span>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Image
              src="https://via.placeholder.com/120x32/?text=&nbsp;"
              className="mr-2"
            />
            {"  "}
            <Image
              src="https://via.placeholder.com/120x32/?text=&nbsp;"
              className="mr-2"
            />
            {"  "}
            <Image
              src="https://via.placeholder.com/120x32/?text=&nbsp;"
              className="mr-2"
            />
            {"  "}
            <Image src="https://via.placeholder.com/120x32/?text=&nbsp;" />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function JobTypeCard() {
  const [jobtype, setJobType] = useState();
  const [value, setValue] = useState();
  const [jobSpec, setJobSpec] = useState();
  const [canMenuOpen, toggleMenuOpen] = useState(false);
  const handleValue = newValue => {
    setValue(newValue);
  };
  const handleInputValue = inputValue => {
    toggleMenuOpen(inputValue.length && inputValue.length > 2);
  };
  const handleJobTypeChange = selectedValue => setJobType(selectedValue);
  const handleJobSpec = selectedValue => {
    setJobSpec(selectedValue);
  };

  const customStyles = {
    dropdownIndicator: (provider, state) => ({
      display: "none"
    }),
    indicatorSeparator: (provider, state) => ({
      display: "none"
    }),
    menu: (provided, state) => ({
      ...provided,
      zIndex: "2"
    })
  };
  const specStyle = {
    menu: (provided, state) => ({
      ...provided,
      zIndex: "2"
    })
  };
  const customDropStyles = {
    menu: (provided, state) => ({
      ...provided,
      zIndex: "2"
    })
  };
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>What kind of job are you posting?</Card.Title>
        <Card.Subtitle className="mb-4 text-muted">
          Let's set the main job attributes
        </Card.Subtitle>
        <Form>
          <Form.Group controlId="exampleForm.JobTitle">
            <Form.Label>What's the job title?</Form.Label>
            <div className="w-75">
              <CreatableSelect
                classNamePrefix="react-select"
                value={value}
                menuIsOpen={canMenuOpen}
                onChange={handleValue}
                onInputChange={handleInputValue}
                options={[
                  "admin executive",
                  "senior admin executive",
                  "junior admin executive",
                  "admin administration",
                  "human resources admin",
                  "executive admin",
                  "administrator",
                  "administration finance",
                  "administration officer",
                  "administrator human resources",
                  "administration manager",
                  "administration assistant",
                  "administrator operation"
                ].map((x, index) => ({
                  value: x,
                  label: `${x}`
                }))}
                placeholder=""
                styles={customStyles}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="exampleForm.JobType">
            <Form.Label>What kind of employee do you need?</Form.Label>
            <Form.Group>
              <ToggleButtonGroup
                name="jobType"
                value={jobtype}
                defaultValue={"Full-time"}
                onChange={handleJobTypeChange}
              >
                {["Full-time", "Part-time", "Contract", "Temporary"].map(
                  (x, index) => (
                    <ToggleButton
                      variant={
                        jobtype === x ? "secondary" : "outline-secondary"
                      }
                      value={x}
                      key={index}
                    >
                      {x}
                    </ToggleButton>
                  )
                )}
              </ToggleButtonGroup>
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="exampleForm.Position">
            <Form.Label>What's the position level?</Form.Label>
            <Form.Control as="select" className="w-auto">
              <option>Select...</option>
              <option>Senior Manager</option>
              <option>Manager</option>
              <option>Senior Executive</option>
              <option>Junior Executive</option>
              <option>Entry Level</option>
              <option>Non-Executive</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.Experience">
            <Form.Label>What's the years of experience required?</Form.Label>
            <Form.Control
              className="w-25"
              type="number"
              min="0"
              max="24"
              onInput={e => {
                e.target.value = Math.max(0, parseInt(e.target.value, 10))
                  .toString()
                  .slice(0, 2);
              }}
            />
            {/* <Form.Control as="select" className="w-auto"><option>Select...</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option></Form.Control> */}
          </Form.Group>
          <Form.Group controlId="exampleForm.JobSpec">
            <Form.Label>What's the job specialisation and role?</Form.Label>
            <Form.Text className="text-muted">
              What industry is your company in and under which categories below
              does this job fall?
            </Form.Text>
            <div className="form-cascade-items w-75">
              <div className="form-cascade-item">
                <Select
                  classNamePrefix="react-select"
                  value={jobSpec}
                  onChange={handleJobSpec}
                  options={JOB_SPECIFICATIONS}
                  styles={specStyle}
                />
              </div>
              {jobSpec !== undefined && (
                <div className="form-cascade-item">
                  <Select
                    classNamePrefix="react-select"
                    options={ADMIN_ROLES}
                    styles={customDropStyles}
                  />
                </div>
              )}
            </div>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

function BudgetCard() {
  const [paytype, setPayType] = useState();
  const [showBudget, setShowBudget] = useState(false);
  const [minSalary, setMinSalary] = useState();
  const [maxSalary, setMaxSalary] = useState();
  const MIN = 1000;
  const MAX = 4000;
  const avgLowerBound = parseInt((MAX - MIN) * 0.2, 10) + MIN;
  const avgHigherBound = parseInt((MAX - MIN) * 0.7, 10) + MIN;
  const MEDIUM = (avgLowerBound + avgHigherBound) / 2;

  const handlePayTypeChange = selectedValue => setPayType(selectedValue);
  const handleMinSalary = e => {
    let x = e.target.value;
    x = x * 1;
    if (!showBudget) setShowBudget(true);
    setMinSalary(x);
  };
  const handleMaxSalary = e => {
    let x = e.target.value;
    x = x * 1;
    if (!showBudget) setShowBudget(true);
    setMaxSalary(x);
  };
  const handleFocusMinSalary = e => {
    if (!showBudget) setShowBudget(true);
  };
  const handleFocusMaxSalary = e => {
    if (!maxSalary)
      e.target.value = minSalary + (avgHigherBound - avgLowerBound);
    setMaxSalary(e.target.value);
  };
  function AlertMsg() {
    if (minSalary >= MIN && maxSalary <= MAX && maxSalary > minSalary) {
      if (maxSalary > avgHigherBound) {
        return (
          <div className="d-flex mb-0 text-info">
            <div className="mr-2">
              <FontAwesomeIcon icon={faThumbsUp} fixedWidth />
            </div>
            <div>
              <strong>Above market average</strong>
              <br />
              <em>
                This gives you great chances to find a great candidate for the
                job.
              </em>
            </div>
          </div>
        );
      } else if (minSalary < avgLowerBound || maxSalary < MEDIUM) {
        return (
          <div className="d-flex mb-0 text-danger">
            <div className="mr-2">
              <FontAwesomeIcon icon={faExclamation} fixedWidth />
            </div>
            <div>
              <strong>Below market average</strong>
              <br />
              <em>
                This could make it difficult for you to find a good candidate
                for the job.
              </em>
            </div>
          </div>
        );
      } else {
        return (
          <div className="d-flex mb-0 text-success">
            <div className="mr-2">
              <FontAwesomeIcon icon={faCheck} fixedWidth />
            </div>
            <div>
              <strong>Within market average</strong>
              <br />
              <em>
                This gives you good chances to find a good candidate for the job
              </em>
            </div>
          </div>
        );
      }
    } else return null;
  }
  /*   function ShowSlider() {
    if (minSalary >= MIN && maxSalary >= minSalary) {
      return (
        <Slider
          min={MIN}
          max={MAX}
          range={true}
          value={[minSalary, maxSalary]}
          tooltipVisible={true}
          className="mt-5"
        />
      );
    } else return <div />;
  } */
  return (
    <>
      <Col md={7}>
        <Card className="mb-4 card-zindex1">
          <Card.Body>
            <Card.Title>What is your budget?</Card.Title>
            <Card.Subtitle className="mb-4 text-muted">
              Candidates are more likely to apply for a job that offers salary
              info
            </Card.Subtitle>
            <Form>
              {false && (
                <Form.Group controlId="exampleForm.Paid">
                  <Form.Label>How do employees get paid?</Form.Label>
                  <ToggleButtonGroup
                    name="Paid"
                    value={paytype}
                    defaultValue={"Monthly"}
                    onChange={handlePayTypeChange}
                  >
                    {["Monthly", "Hourly", "Commission"].map((x, index) => (
                      <ToggleButton
                        key={index}
                        variant={
                          paytype === x ? "secondary" : "outline-secondary"
                        }
                        value={x}
                      >
                        {x}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Form.Group>
              )}

              <Form.Group className="w-75">
                <Form.Label>What's the salary range?</Form.Label>
                <InputGroup className="mb-3">
                  <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-secondary"
                    title="MYR"
                    id="salaryCurrency"
                  >
                    <Dropdown.Item href="#">MYR</Dropdown.Item>
                    <Dropdown.Item href="#">SGD</Dropdown.Item>
                    <Dropdown.Item href="#">IDR</Dropdown.Item>
                  </DropdownButton>
                  <Form.Control
                    id="minsalary"
                    as="input"
                    aria-describedby="basic-addon1"
                    onFocus={handleFocusMinSalary}
                    onChange={handleMinSalary}
                    type="number"
                    value={minSalary}
                  />
                  <div className="input-group-middle">
                    <span className="input-group-text">to</span>
                  </div>
                  <Form.Control
                    id="maxsalary"
                    as="input"
                    aria-describedby="basic-addon2"
                    onFocus={handleFocusMaxSalary}
                    onChange={handleMaxSalary}
                    type="number"
                    value={maxSalary}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="exampleForm.DisplaySalary">
                <Form.Check
                  defaultChecked={true}
                  type="checkbox"
                  label="Display salary on ad to attract the right candidates"
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={5}>
        <Fade in={showBudget} mountOnEnter>
          <div className="mb-3 slideFromLeft">
            <div className="position-relative">
              <Card className="card--arrow">
                <Card.Body>
                  <p>
                    The average monthly salary for{" "}
                    <strong>Admin Executive</strong> in Malaysia is between{" "}
                    <strong>MYR {avgLowerBound}</strong> and{" "}
                    <strong>MYR {avgHigherBound}</strong>.
                  </p>

                  <div className="py-4">
                    {/* <ShowSlider /> */}
                    <ProgressBar className="progressHeight">
                      <ProgressBar className="progressLow" now={25} key={1} />
                      <ProgressBar className="progressAvg" now={50} key={2} />
                      <ProgressBar className="progressHigh" now={25} key={3} />
                    </ProgressBar>

                    <div className="d-flex justify-content-between">
                      <span>Low</span>
                      <span>1,600</span>
                      <span>Average</span>
                      <span>3,100</span>
                      <span>High</span>
                    </div>
                  </div>
                  <AlertMsg />
                  <Form.Text className="text-right text-muted">
                    <em>Based on JobStreet.com data, on February 2020</em>
                  </Form.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Fade>
      </Col>
    </>
  );
}

function JobDescCard() {
  const [jobType, setJobType] = useState("1");
  const handleJobTypeChange = selectedValue => setJobType(selectedValue);
  const [editorContent, setEditorContent] = useState();
  const handleEditorContentUpdate = value => {
    setEditorContent(value);
  };

  return (
    <>
      <Col md={7}>
        <Card className="mb-3">
          <Card.Body>
            <Card.Title>What's the job description?</Card.Title>
            <Card.Subtitle className="mb-4 text-muted">
              Let's set the job tasks and requirements
            </Card.Subtitle>
            <Form.Group>
              <ToggleButtonGroup
                name="JobDescType"
                value={jobType}
                defaultValue={"1"}
                onChange={handleJobTypeChange}
                className="btn-group-justified"
              >
                <ToggleButton
                  value="1"
                  variant={jobType === "1" ? "secondary" : "outline-secondary"}
                >
                  <p>
                    <FontAwesomeIcon icon={faEdit} size="3x" />
                  </p>
                  <p>Guide me write it</p>
                </ToggleButton>
                <ToggleButton
                  value="2"
                  variant={jobType === "2" ? "secondary" : "outline-secondary"}
                >
                  <p>
                    <FontAwesomeIcon icon={faUserEdit} size="3x" />
                  </p>
                  <p>I'll write my own</p>
                </ToggleButton>
              </ToggleButtonGroup>
            </Form.Group>
            {jobType === "1" && (
              <div className="w-75">
                <Form.Group>
                  <Form.Label>Tasks & Responsibilities</Form.Label>
                  <Form.Text className="text-muted">
                    Let candidates know what they will be doing day-to-day
                  </Form.Text>
                  <JDFields />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Qualification & Experience</Form.Label>
                  <Form.Text className="text-muted">
                    What qualifies or experience candidates must have?
                    <br />
                    How much experience (if any) do they needed?
                  </Form.Text>
                  <JDFields />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Skills & Abilities</Form.Label>
                  <Form.Text className="text-muted">
                    What skill or ability candidates must have
                  </Form.Text>
                  <JDFields />
                </Form.Group>
              </div>
            )}
            {jobType === "2" && (
              <div className="inViewportObserver">
                <Editor
                  id="tinyMceEditor"
                  apiKey="nkig6i1adoid571m50wmlrc7xloc51qpntukixl5sb6tcvyk"
                  initialValue="<p>Let's write some content</p>"
                  init={{
                    height: 300,
                    menubar: false,
                    browser_spellcheck: true,
                    plugins: [
                      "advlist autolink lists link image",
                      "charmap print preview anchor help",
                      "searchreplace visualblocks code",
                      "insertdatetime media table paste wordcount spellchecker"
                    ],
                    toolbar: "bold italic underline | bullist numlist"
                  }}
                  onEditorChange={handleEditorContentUpdate}
                  value={editorContent}
                />
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <div className="pb-md-5" />
        <div className="pb-md-5" />
        <div className="pb-md-5" />
        <div className="pb-md-5" />
        <div className="pb-md-5" />
        <div className="jobDescCueContent">
          <Fade in={editorContent && jobType === "2" && false} mountOnEnter>
            <div className="mb-3 text-muted slideFromLeft">
              <Card className="card--topLeftArrow">
                <Card.Body>
                  <p>
                    Your job ad has an Average score, rating{" "}
                    <strong>65%</strong> better than all other{" "}
                    <strong>Admin Executive</strong> job ads posted by
                    JobStreet.
                  </p>
                  <p>
                    <small>How to improve your job ad?</small>
                  </p>
                  <hr />
                  <Row>
                    <Col>
                      <small>
                        You are using too many long words. Try replacing some of
                        them with shorter alternatives.
                      </small>
                    </Col>
                    <Col md="auto">
                      <Button variant="secondary" size="sm">
                        Improve
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </Fade>
        </div>
      </Col>
    </>
  );
}
function JDField({ field, index, updateField, removeField }) {
  return (
    <div key={index}>
      <InputGroup className="mb-1">
        <Form.Control onChange={e => updateField(e.target.value, index)} />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={() => removeField(index)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}
function JDFields() {
  const [fields, setField] = useState([]);
  const addField = () => {
    const newField = [...fields, { text: "" }];
    setField(newField);
  };
  const updateField = (value, index) => {
    const newField = [...fields];
    newField[index].text = value;
    setField(newField);
  };
  const removeField = index => {
    const newField = [...fields];
    newField.splice(index, 1);
    setField(newField);
  };
  return (
    <Form>
      {fields.map((field, index) => (
        <JDField
          key={index}
          index={index}
          field={field}
          updateField={updateField}
          removeField={removeField}
        />
      ))}
      {fields.length < 5 && (
        <Button variant="light" onClick={addField} className="btn--addMore">
          + Add more
        </Button>
      )}
    </Form>
  );
}

function TripleFields({ props }) {
  const [field, setField] = useState(0);
  return (
    <Form className="w-75">
      <InputGroup className="mb-1">
        <InputGroup.Prepend>
          <InputGroup.Text id="appreciate-addon1">1</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control placeholder="" aria-describedby="appreciate-addon1" />
      </InputGroup>
      <Collapse in={field >= 1} mountOnEnter={true}>
        <InputGroup className="mb-1">
          <InputGroup.Prepend>
            <InputGroup.Text id="appreciate-addon2">2</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control aria-describedby="appreciate-addon3" />
          <InputGroup.Append>
            <InputGroup.Text id="appreciate-addon2b">
              <FontAwesomeIcon icon={faTrashAlt} />
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </Collapse>
      <Collapse in={field >= 2} mountOnEnter={true}>
        <InputGroup className="mb-1">
          <InputGroup.Prepend>
            <InputGroup.Text id="appreciate-addon3">3</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control aria-describedby="appreciate-addon3" />
          <InputGroup.Append>
            <InputGroup.Text id="appreciate-addon2b">
              <FontAwesomeIcon icon={faTrashAlt} />
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </Collapse>
      {field < 2 && (
        <Button
          variant="light"
          className="text-left w-100 btn--addMore"
          onClick={() => setField(field + 1)}
        >
          +Add more
        </Button>
      )}
    </Form>
  );
}

function WorkingLocationCard() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });
  /*   const countriesOptions = [
    { value: "my", label: "Malaysia", checked: true },
    { value: "id", label: "Indonesia" },
    { value: "sg", label: "Singapore" }
  ]; */
  const searchOptions = {
    types: ["establishment"],
    componentRestrictions: { country: ["my"] }
  };
  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    /*     document
      .getElementById("tags")
      .scrollIntoView({ behavior: "smooth", block: "end" }); */
  };

  /*   function CountriesCheckboxes(props) {
    return countriesOptions.map((x, index) => (
      <Form.Check
        key={index}
        type="checkbox"
        label={x.label}
        value={x.value}
        name="countries"
        checked={x.checked}
      />
    ));
  } */

  return (
    <Card>
      <Card.Body>
        <Card.Title>Where is your new employee going to work?</Card.Title>
        <Card.Subtitle className="mb-4 text-muted">
          Type in the address of your working location. (e.g. office, factory)
        </Card.Subtitle>
        <Form>
          {/*           <Form.Group>
            <Form.Label>Where do you want to post this job?</Form.Label>
            <Form.Text className="text-muted">
              Select 1 or more countries.
            </Form.Text>
            <CountriesCheckboxes />
          </Form.Group> */}
          <Form.Group controlId="exampleForm.PreferredWorkLocation">
            <div className="mb-2">
              <PlaceAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
                searchOptions={searchOptions}
                highlightFirstSuggestion
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading
                }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: "Type address",
                        className: "form-control",
                        "aria-haspopup": true
                      })}
                    />
                    <div className="mt-2 position-relative">
                      {loading ? (
                        <div className="dropdown-menu">...loading</div>
                      ) : (
                        suggestions &&
                        suggestions.length > 0 && (
                          <div className="dropdown-menu show">
                            {suggestions.map(suggestion => {
                              return (
                                <div
                                  {...getSuggestionItemProps(suggestion, {
                                    className: "dropdown-item"
                                  })}
                                >
                                  {suggestion.description}
                                </div>
                              );
                            })}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </PlaceAutocomplete>
            </div>
            {coordinates.lat && (
              <div className="mt-3">
                <Form.Label>Nearby facilities based on the address:</Form.Label>
                <Form.Text>
                  Click <FontAwesomeIcon icon={faPlusCircle} /> to let the
                  applicant know
                </Form.Text>
                <div id="tags">
                  <Tag value="LRT station" />
                  <Tag value="MRT station" />
                  <Tag value="Shopping mall" />
                  <Tag value="Food court" />
                  <Tag value="Easy access" />
                  <Tag value="Parking nearby" />
                </div>
              </div>
            )}
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

function Tag({ onDeleteTag, value }) {
  const [isActive, setActive] = useState(false);
  const [isMouseOver, checkMouseOver] = useState(false);
  return (
    <Button
      className="pill mr-1 mb-1"
      variant={isActive ? "secondary" : "outline-secondary"}
      onClick={() => setActive(!isActive)}
      onMouseOver={() => {
        checkMouseOver(true);
      }}
      onMouseOut={() => {
        checkMouseOver(false);
      }}
      size="sm"
    >
      <span className="mr-2">{value}</span>
      {isActive ? (
        <>
          {isMouseOver ? (
            <FontAwesomeIcon icon={faTimes} fixedWidth />
          ) : (
            <FontAwesomeIcon icon={faCheck} fixedWidth />
          )}
        </>
      ) : (
        <>
          {isMouseOver ? (
            <FontAwesomeIcon icon={faPlusCircle} fixedWidth />
          ) : (
            <FontAwesomeIcon icon={faPlusCircle} fixedWidth />
          )}
        </>
      )}
    </Button>
  );
}

function SkillEduCard() {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>
          What skills and education does the perfect hire have?
        </Card.Title>
        <Card.Subtitle className="mb-4 text-muted">
          Improve your job ad to attract the ideal candidates
        </Card.Subtitle>
        <Form>
          <Form.Group controlId="exampleForm.Skills">
            <Form.Label>What are your needed skills? (optional)</Form.Label>
            <div className="w-75">
              <Select
                classNamePrefix="react-select"
                defaultValue={[
                  { value: "organization", label: "organization" },
                  {
                    value: "verbal communication",
                    label: "verbal communication"
                  },
                  { value: "typing", label: "typing" },
                  { value: "Microsoft Office", label: "Microsoft Office" }
                ]}
                isClearable={false}
                isMulti
                options={SKILLS}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="exampleForm.EduLevel">
            <Form.Label>
              What level of education is needed? (optional)
            </Form.Label>
            <div className="w-75">
              <Select
                classNamePrefix="react-select"
                isClearable={false}
                isMulti
                options={[
                  'Primary/Secondary School/SPM/"O" Level',
                  'Higher Secondary/STPM/"A" Level/Pre-U',
                  "Professional Certificate",
                  "Diploma/Advanced/Higher/Graduate Diploma",
                  "Bachelor's Degree/Post Graduate Diploma/Professional Degree",
                  "Master's Degree",
                  "Doctorate (PhD)"
                ].map((x, index) => ({
                  value: x,
                  label: `${x}`
                }))}
              />
            </div>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}
function AppreciateCard() {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>What is great about your company and this job?</Card.Title>
        <Card.Subtitle className="mb-4 text-muted">
          To attract the ideal candidates outline the best parts about working
          for your company. (Optional)
        </Card.Subtitle>
        <TripleFields />
      </Card.Body>
    </Card>
  );
}
/* function CompanyDescCard() {
  const [isEditing, toggleEdit] = useState();
  const [content, handleEditorChange] = useState();
  const updateContent = content => handleEditorChange(content);

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex">
          <div>
            <Card.Title>What is it like to work for your company?</Card.Title>
            <Card.Subtitle className="mb-4 text-muted">
              Candidates are more likely to apply for a job when they know more
              about the company.
            </Card.Subtitle>
          </div>
          {false && (
            <div>
              <Button
                variant={isEditing ? "info" : "light"}
                size="sm"
                onClick={() => toggleEdit(!isEditing)}
              >
                {isEditing ? "Save" : "Edit"}
              </Button>
            </div>
          )}
        </div>
        <Editor
          id="tinyMceEditor2"
          apiKey="nkig6i1adoid571m50wmlrc7xloc51qpntukixl5sb6tcvyk"
          initialValue="<p>What time does work start and end daily?</p><ul><li>Regular hours, Mondays - Fridays</li></ul><hr /><p>What kind of perks and benefits employees have?</p><ul><li>Medical</li><li>Dental</li><li>Work from home</li></ul>"
          value={content}
          disabled={!isEditing}
          inline={true}
          init={{
            height: 300,
            menubar: false,
            plugins: [
              "advlist autolink lists link image",
              "charmap print preview anchor help",
              "searchreplace visualblocks code",
              "insertdatetime media table paste wordcount spellchecker"
            ],
            toolbar: "bold italic underline | bullist numlist"
          }}
          toolbar="bold italic underline | bullist numlist"
          onEditorChange={updateContent}
        />
      </Card.Body>
    </Card>
  );
} */
function JobAdScheduleCard() {
  const [dateRange, setdateRange] = useState({
    startDate: moment(),
    endDate: moment().add(30, "days")
  });
  const [focus, setFocus] = useState(null);
  const { startDate, endDate } = dateRange;
  const handleOnDateChange = (startDate, endDate) =>
    setdateRange(startDate, endDate);

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>When do you like to post this job ad?</Card.Title>
        <Card.Subtitle className="mb-4 text-muted">
          Set the posting period and choose how to receive the candidates
          applications
        </Card.Subtitle>
        <Form>
          <Form.Group controlId="exampleForm.ScheduledPeriod">
            <Form.Label>When do you want to post this ad?</Form.Label>
            <div>
              <DateRangePicker
                openDirection="up"
                startDatePlaceholderText="Start"
                startDate={startDate}
                onDatesChange={handleOnDateChange}
                endDatePlaceholderText="End"
                endDate={endDate}
                showClearDates={true}
                focusedInput={focus}
                onFocusChange={focus => setFocus(focus)}
                startDateId="startDateMookh"
                endDateId="endDateMookh"
                displayFormat="LL"
                minimumNights={30}
                small
                customInputIcon={<FontAwesomeIcon icon={faCalendarAlt} />}
              />
            </div>
          </Form.Group>
          {false && (
            <fieldset>
              <Form.Group>
                <Form.Label as="legend">
                  How do you prefer candidates to apply?
                </Form.Label>
                <Form.Check
                  type="radio"
                  name="ApplyPreference"
                  id="ApplyPreference1"
                  defaultChecked={true}
                  label={
                    <>
                      <strong>Recommended</strong>: Allow 1 click easy
                      applications on our website and nofiy me by email
                    </>
                  }
                />
                <div className="w-75">
                  <div className="ml-4 my-2">
                    <Form.Group controlId="EmailNotify">
                      <Form.Check label="Also notify me by email" />
                      <Form.Control type="email" />
                    </Form.Group>
                  </div>
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Check
                  type="radio"
                  name="ApplyPreference"
                  id="ApplyPreference2"
                  label="Send candidates to another link to apply"
                />
                <div className="w-75">
                  <div className="ml-4 my-2">
                    <Form.Control
                      type="url"
                      placeholder="http://yourcompany.com/job123"
                    />
                  </div>
                </div>
              </Form.Group>
            </fieldset>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}

function PreviewButton() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isDesktop, setValue] = useState(false);
  const handleSwitchPreview = val => setValue(val);

  function Mobile() {
    return (
      <div className="mobile-frame-container">
        <div className="mobile-frame" />
        <div className="mobile-frame-inner">
          <PerfectScrollbar>
            <Image src="/img/mobile-long2.png" width="310" />
          </PerfectScrollbar>
        </div>
      </div>
    );
  }
  function Desktop() {
    return (
      <div className="w-100">
        <Image src="/img/desktop2.jpg" fluid />
      </div>
    );
  }

  return (
    <>
      <Button
        variant="outline-secondary"
        className="mr-sm-2"
        onClick={handleShow}
      >
        Preview
      </Button>
      <Modal size="lg" show={show} scrollable onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <ToggleButtonGroup
              type="radio"
              value={isDesktop}
              name="previewType"
              onChange={handleSwitchPreview}
            >
              <ToggleButton
                value={false}
                variant={!isDesktop ? "secondary" : "outline-secondary"}
              >
                <FontAwesomeIcon icon={faMobile} /> Mobile
              </ToggleButton>
              <ToggleButton
                value={true}
                variant={isDesktop ? "secondary" : "outline-secondary"}
              >
                <FontAwesomeIcon icon={faDesktop} /> Desktop
              </ToggleButton>
            </ToggleButtonGroup>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          {isDesktop ? <Desktop /> : <Mobile />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

/* function PostButton() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Post
      </Button>
      <Modal centered size="lg" show={show} scrollable onHide={handleClose}>
        <Modal.Body className="d-flex align-items-center justify-content-center py-5">
          <div className="py-5" />
          <div className="text-center">
            <p className="text-success">
              <FontAwesomeIcon icon={faCheckCircle} size="5x" />
            </p>
            <h4>Good work, you've posted your job ad.</h4>
          </div>
          <div className="py-5" />
        </Modal.Body>
      </Modal>
    </>
  );
} */

export default function App() {
  /*   const icons = {
    finish: <FontAwesomeIcon icon={faCheck} />,
    error: <FontAwesomeIcon icon={faTimes} />
  }; */
  const { Step } = Steps;
  const MAX_PAGE = 3; // zero based
  const [activeStep, setOpen] = useState(0);
  const goNextStep = () => {
    let newStepNo = activeStep;
    newStepNo = newStepNo > MAX_PAGE ? MAX_PAGE : newStepNo + 1;
    setOpen(newStepNo);
    window.scrollTo(0, 0);
  };
  const goPrevStep = () => {
    let newStepNo = activeStep;
    newStepNo = newStepNo < 0 ? 0 : newStepNo - 1;
    setOpen(newStepNo);
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <TopNav />
      <Container className="my-4 mb-5">
        {activeStep < 2 && (
          <Row>
            <Col md="7">
              <Steps
                current={activeStep}
                labelPlacement="vertical"
                className="filter--grey"
              >
                <Step title="Write" />
                <Step title="Attract & Post" />
              </Steps>
            </Col>
          </Row>
        )}
        {activeStep === 0 && (
          <div className="my-3">
            <h3>Step 1: Write</h3>
            <p>Write the job details and requirements</p>
          </div>
        )}
        {activeStep === 1 && (
          <div className="my-3">
            <h3>Step 2: Attract (optional)</h3>
            <p>Add additional details to make your job ad stand out</p>
          </div>
        )}
      </Container>
      <Container className="my-3">
        {activeStep === 0 && (
          <Row>
            <Col md={7}>
              <JobTypeCard />
            </Col>
            <BudgetCard />
            <JobDescCard />
            <Col md={7}>
              <WorkingLocationCard />
            </Col>
          </Row>
        )}
        {activeStep === 1 && (
          <Row>
            <Col md={7}>
              <SkillEduCard />
            </Col>
            <Col md={7}>
              <AppreciateCard />
            </Col>
            {/*             <Col md={7}>
              <CompanyDescCard />
            </Col> */}
            <Col md={7}>
              <JobAdScheduleCard />
            </Col>
          </Row>
        )}
        {activeStep === 2 && (
          <div className="d-flex align-items-center justify-content-center py-5">
            <div className="py-5" />
            <div className="text-center">
              <p className="text-success">
                <FontAwesomeIcon icon={faCheckCircle} size="5x" />
              </p>
              <h4>Good work, you've posted your job ad.</h4>
            </div>
            <div className="py-5" />
          </div>
        )}
      </Container>
      <div className="pb-5" />
      <Navbar bg="light" expand="lg" className="fixed-bottom">
        <Container>
          <Nav className="justify-content-center">
            {activeStep === 1 && (
              <Nav.Link href="#" onClick={goPrevStep}>
                <FontAwesomeIcon icon={faArrowLeft} /> Back
              </Nav.Link>
            )}
          </Nav>
          <Form inline>
            {activeStep < 2 && (
              <Button variant="link" className="mr-sm-2">
                Save
              </Button>
            )}
            {activeStep === 0 && (
              <Button
                variant="secondary"
                className="mr-sm-2"
                onClick={goNextStep}
              >
                Continue
              </Button>
            )}
            {activeStep === 1 && (
              <>
                <PreviewButton />
                <Button variant="secondary" onClick={goNextStep}>
                  Post
                </Button>
              </>
            )}
          </Form>
          <Nav>&nbsp;</Nav>
        </Container>
      </Navbar>
    </div>
  );
}
