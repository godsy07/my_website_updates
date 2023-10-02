import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useState } from 'react'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'

import {BASE_URL} from "../../../config/config"

const ManageImages = () => {
  const [showAddImageModal, setShowAddImageModal] = useState(false);
  const [image, setImage] = useState(null);
  const [privateImage, setPrivateImage] = useState(false);
  const [imageDetails, setImageDetails] = useState({
    title: "",
    tags: '',
    description: '',
  });

  const  handleImageDataChange = (e) => {
    const {name, value} = e.target;
    setImageDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const uploadUserImage = async(e) => {
    try {
      e.preventDefault();
      const tags = imageDetails.tags.split(',');
      const formdata = new FormData();
      formdata.append('image_title', imageDetails.title);
      // formdata.append('image_tags', tags);
      formdata.append('image', image[0]);
      formdata.append('image_description', imageDetails.description);
      tags.forEach((element) => {
        formdata.append('image_tags[]', element);
      });

      let upload_url = privateImage?'upload-a-private-images':'upload-a-public-images';
      const response = await axios.post(`${BASE_URL}/images/${upload_url}`,
        formdata,
        {
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        console.log(response);
      }

    } catch(e) {
      if (e.response) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: e.response.data.message,
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong!!!',
        })
      }
    }
  }

  return (
    <div className='page-content-div'>

      <Modal size='lg' show={showAddImageModal} onHide={() => setShowAddImageModal(false)}>
        <Modal.Header closeButton><h5>Add Image</h5></Modal.Header>
        <Modal.Body>

          <FormGroup className='mb-3'>
            <Form.Label>Image Title</Form.Label>
            <Form.Control type='text' name='title' value={imageDetails.title} onChange={handleImageDataChange} placeholder='Enter Image title' />
          </FormGroup>

          <FormGroup className='mb-3'>
            <Form.Check type="switch" checked={privateImage} onChange={() => setPrivateImage(!privateImage)} label='Make Image Private' />
          </FormGroup>

          <FormGroup className='mb-3'>
            <Form.Label>Image Tags</Form.Label>
            <Form.Control type='text' name='tags' value={imageDetails.tags} onChange={handleImageDataChange} placeholder='Enter Image tags' />
            <span>Note: Separate multiple tags using comma</span>
          </FormGroup>

          <FormGroup className='mb-3'>
            <Form.Label>Select File</Form.Label>
            <Form.Control
              type='file'
              onChange={(e) => {
                e.stopPropagation();
                setImage(e.target.files);
              }}
              placeholder='Enter Image tags'
            />
            <span>Note: Separate multiple tags using comma</span>
          </FormGroup>
          
          <FormGroup className='mb-3'>
            <Form.Label>Image Description</Form.Label>
            <Form.Control as='textarea' rows={3} type='text' name='description' value={imageDetails.description} onChange={handleImageDataChange} placeholder='Enter Image title' />
          </FormGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={uploadUserImage}>Upload Image</Button>
          <Button variant='secondary' onClick={() => setShowAddImageModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <div className='page-header'>
        <h3>Manage Images</h3>
      </div>
      <div className='page-content'>
        <div className='d-flex justify-content-end'>
          <Button onClick={() => setShowAddImageModal(true)}>Add Image</Button>
        </div>
      </div>
    </div>
  )
}

export default ManageImages
