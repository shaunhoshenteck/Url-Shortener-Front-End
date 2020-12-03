import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import {
    Container,
    Form,
    FormControl,
    Row,
    Button,
    Collapse,
    InputGroup,
} from 'react-bootstrap';

const errMsg = "There's an unknown error... Please try again!";
const Create = () => {
    const [customMode, setCustomMode] = useState(true);
    const [url, setUrl] = useState();
    const [customInput, setCustomInput] = useState();
    const [result, setResult] = useState({
        isSuccess: false,
        msg: errMsg,
        data: {},
    });
    const [redirect, setRedirect] = useState(false);

    const createUrl = () => {
        let isSuccess, msg, data;
        console.log('creatingUrl');
        Axios.post(
            'https://url-shortener-back-end.herokuapp.com/api/url/create',
            {
                longUrl: url,
                customString: customMode ? customInput : '',
            }
        )
            .then(response => {
                switch (response.status) {
                    case 200:
                        isSuccess = true;
                        msg =
                            'A short URL is successfully generated for this long URL!';
                        data = response.data;
                        break;
                    case 201:
                        isSuccess = true;
                        data = response.data;
                        msg =
                            'Someone has already created a short URL for this website!';
                        break;
                    default:
                        isSuccess = false;
                        msg = errMsg;
                        break;
                }
                console.log(response.status);
                console.log(response.data);
            })
            .catch(err => {
                if (err.response) {
                    switch (err.response.status) {
                        case 401:
                            isSuccess = false;
                            console.log('401!');
                            msg =
                                "This website's URL is not valid! Please try again!";
                            break;
                        case 409:
                            isSuccess = false;
                            msg =
                                'Sorry, this short URL address has been taken! Please try again!';
                            break;
                        default:
                            isSuccess = false;
                            msg = errMsg;
                            break;
                    }
                }
                console.log(err.response);
            })
            .finally(() => {
                console.log(msg);
                setResult({ isSuccess, msg, data });
                setRedirect(true);
            });
    };

    if (redirect) {
        console.log(result);
        return <Redirect to={{ pathname: '/result', state: result }} />;
    }

    return (
        <>
            <Container>
                <div style={{ background: 'yellow' }}>
                    <h1 className="mt-2">URL Shortener</h1>
                    <h5 className="mb-2">Customize your own branded URL!</h5>
                </div>
                <Form>
                    <Form.Group controlId="formLongUrl">
                        <Form.Label>Step 1: Enter long URL*</Form.Label>
                        <FormControl
                            type="url"
                            placeholder="https://www.amazon.com/"
                            onChange={event => setUrl(event.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formCustomString">
                        <Form.Label>Step 2:</Form.Label>
                        <Row className="ml-0 mb-2">
                            <Button
                                id="custom-btn"
                                className={
                                    'btn-info mr-3 ' +
                                    (customMode ? '' : 'disabled')
                                }
                                onClick={() => {
                                    setCustomMode(true);
                                }}
                                aria-controls="input-custom-string"
                                aria-expanded={customMode}>
                                Customize
                            </Button>
                            <Button
                                id="auto-btn"
                                className={
                                    'btn-info mr-3 ' +
                                    (!customMode ? '' : 'disabled')
                                }
                                onClick={() => setCustomMode(false)}>
                                Auto-generate
                            </Button>
                        </Row>
                        <Collapse in={customMode}>
                            <div id="input-custom-string">
                                <Form.Label>
                                    Set your own custom label*
                                </Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="base-url">
                                            {window.location.origin + '/'}
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        type="text"
                                        aria-describedby="base-url"
                                        placeholder="EX: banana"
                                        onChange={event => {
                                            setCustomInput(event.target.value);
                                        }}
                                        required
                                    />
                                </InputGroup>
                            </div>
                        </Collapse>
                        <Row className="mt-4">
                            <Button
                                className="m-auto btn-lg btn-success"
                                variant="primary"
                                disabled={
                                    !(
                                        (!customMode && url) ||
                                        (customMode && url && customInput)
                                    )
                                }
                                onClick={() => createUrl()}>
                                Create
                            </Button>
                        </Row>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
};
export default Create;
