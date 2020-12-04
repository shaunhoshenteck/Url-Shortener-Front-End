import React, { useState, useEffect } from 'react';
import Result from './Result';
import Axios from 'axios';
import { Redirect, useParams } from 'react-router-dom';
import { Form, FormControl, Button, ButtonGroup } from 'react-bootstrap';

const Edit = () => {
    const { urlCode } = useParams();
    const [urlData, setUrlData] = useState();
    const [loading, setLoading] = useState(true);
    const [longUrl, setLongUrl] = useState();
    const [redirect, setRedirect] = useState();
    const getUrl = () => {
        Axios.get(
            `https://url-shortener-back-end.herokuapp.com/api/url/${urlCode}`
        )
            .then(response => {
                if (response.data) {
                    console.log(response.data);
                    setUrlData(response.data);
                    setLongUrl(response.data.longUrl);
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const updateUrl = () => {
        setLoading(true);
        Axios.patch(
            `https://url-shortener-back-end.herokuapp.com/api/url/edit/${urlCode}`,
            {
                newLongUrl: longUrl,
            }
        )
            .then(response => {
                const newUrlData = response.data;
                setUrlData(newUrlData);
                let result = {
                    isSuccess: true,
                    msg: 'Updated successfully!',
                    data: newUrlData,
                };
                setRedirect({ path: '/result', result });
            })
            .catch(err => {
                console.log(err);
                setRedirect({ path: '/unknown-error' });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const deleteUrl = () => {
        Axios.delete(
            `https://url-shortener-back-end.herokuapp.com/api/url/delete/${urlCode}`
        )
            .then(response => {
                console.log(response.status);
                if (response.status === 200) {
                    let result = {
                        isSuccess: true,
                        msg: `Successfully deleted ${urlData.shortUrl}`,
                    };
                    setRedirect({ path: '/result', result });
                } else if (response.status === 404) {
                    let result = {
                        isSuccess: false,
                        msg: `Cannot find ${urlData.shortUrl}`,
                    };
                    setRedirect({ path: '/result', result });
                }
            })
            .catch(err => {
                console.log(err);
                setRedirect({ path: '/unknown-error' });
            });
    };

    useEffect(() => {
        getUrl();
    }, []);

    if (loading) {
        console.log('Loading');
    }
    if (!urlData) {
        return (
            <Result
                result={{
                    isSuccess: false,
                    msg: `Oops, sorry! We can't find this url code '${urlCode}'`,
                }}
            />
        );
    }
    if (redirect) {
        const { path, result } = redirect;
        console.log(result);
        return <Redirect to={{ pathname: path, state: result }} />;
    }

    return (
        <>
            <div className="m-5">
                <Form>
                    <Form.Group controlId="formLongUrl">
                        <Form.Label>
                            <b>Update website long URL:</b>
                        </Form.Label>
                        <FormControl
                            type="url"
                            onChange={event => setLongUrl(event.target.value)}
                            value={longUrl}
                            required
                        />
                    </Form.Group>
                    <div className="buttonGroup">
                        <ButtonGroup>
                            <Button variant="success" onClick={updateUrl}>
                                Update
                            </Button>
                            <Button variant="danger" onClick={deleteUrl}>
                                Delete
                            </Button>
                        </ButtonGroup>
                    </div>
                </Form>
                <div className="mt-3 link">
                    <p>
                        <b>Short URL: </b>
                        <a href={urlData.shortUrl}>{urlData.shortUrl}</a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Edit;
