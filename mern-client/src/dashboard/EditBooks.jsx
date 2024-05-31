import { Button, Checkbox, Label, Select, TextInput, Textarea } from 'flowbite-react';
import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';


const EditBooks = () => {
  const { id } = useParams();
  const { bookTitle, authorname, imageURL, category, bookDescription, quantity } = useLoaderData();


  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Bibliography",
    "Autobiography",
    "History",
    "Self-help",
    "Memoir",
    "Business",
    "Children Books",
    "Travel",
    "Religion",
    "Art and Design"
  ]

  const [selectedBookCategory, setselectedBookCategory] = useState(bookCategories[0]);
  const [bookQuantity, setBookQuantity] = useState(quantity);

  const handleChangeSelectedValue = (event) => {
    // console.log(event.target.value);
    setselectedBookCategory(event.target.value)
  }

  const handleQuantityChange = (event) => {
    setBookQuantity(event.target.value);
  };


  //handle book submision
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const bookTitle = form.bookTitle.value;
    const authorname = form.authorname.value;
    const imageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    //const bookPDF = form.bookPDF.value;
    const quantity = form.quantity.value;

    const updatebookObj = {
      bookTitle, authorname, imageURL, category, bookDescription, quantity
    }

    //console.log(bookObj)
    //update book data
    fetch(`http://localhost:5000/book/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updatebookObj)
    }).then(res => res.json()).then(data => {
      alert("Book updated successfully!!!")
    })
  }

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Update the Book data</h2>

      <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4 ">
        {/* first Row */}
        <div className='flex gap-8'>
          {/* Book name */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput id="bookTitle"
              name="bookTitle" type="text" placeholder="Book Name" required
              defaultValue={bookTitle} />
          </div>

          {/* author name */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="authorname" value="Author Name" />
            </div>
            <TextInput id="authorname"
              name="authorname" type="text" placeholder="Author Name" required
              defaultValue={authorname} />
          </div>
        </div>

        {/* second row */}
        <div className='flex gap-8'>
          {/* Image URL */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="imageURL" value="Book Image URL" />
            </div>
            <TextInput id="imageURL"
              name="imageURL" type="text" placeholder="Book Image" required
              defaultValue={imageURL} />
          </div>

          {/* Category */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Book Category" />
            </div>

            <Select id='inputState' name='categoryName' className='w-full rounded' value={selectedBookCategory} onChange={handleChangeSelectedValue}>
              {
                bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
              }
            </Select>
          </div>
        </div>

        {/* third row */}
        <div className='flex gap-8'>
          {/* Quantity */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="quantity" value="Quantity" />
            </div>
            <TextInput id="quantity" name="quantity" type="number" placeholder="Quantity" required defaultValue={bookQuantity} onChange={handleQuantityChange} />
          </div>
        </div>
        
        {/* bookDescription */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookDescription" value="Book Description" />
          </div>
          <Textarea id="bookDescription" name="bookDescription" placeholder="Book description" required rows={6} className='w-full'
            defaultValue={bookDescription} />
        </div>

        {/* book pdf link */}
        {/* <div>
          <div className="mb-2 block">
            <Label htmlFor="bookPDF" value="Book PDF" />
          </div>
          <TextInput id="bookPDF" type="text"
            name='bookPDF' placeholder="Book PDF URL" required
            defaultValue={bookPDF} />
        </div> */}

        <Button type="submit" className='mt-5'>Update Book</Button>
      </form>
    </div>
  )
}

export default EditBooks