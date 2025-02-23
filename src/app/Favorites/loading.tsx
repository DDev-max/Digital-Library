export default function Loading() {
  return (
    <main id='mainContent' className='favPage'>
      <h1 className='favPage_h2'>Favorite List</h1>
      <div className='favPage_Grid'>
        <div className='bookElmnt bookElmnt--skeleton' />
        <div className='bookElmnt bookElmnt--skeleton' />
        <div className='bookElmnt bookElmnt--skeleton' />
        <div className='bookElmnt bookElmnt--skeleton' />
      </div>
    </main>
  )
}
