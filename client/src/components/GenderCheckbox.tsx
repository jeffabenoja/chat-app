const GenderCheckbox = ({
  selectedGender,
  onCheckedChange,
}: {
  selectedGender: string
  onCheckedChange: (gender: "male" | "female") => void
}) => {
  return (
    <div className='flex gap-4'>
      <div className='form-control'>
        <label className='label gap-2 cursor-pointer text-white'>
          <span className='label-text text-gray-300'>Male</span>
          <input
            type='checkbox'
            className='checkbox bg-black border-white checked:border-white checked:bg-white checked:hover:bg-white hover:border-gray-400'
            checked={selectedGender === "male"}
            onChange={() => onCheckedChange("male")}
          />
        </label>
      </div>
      <div className='form-control'>
        <label className='label gap-2 cursor-pointer text-white'>
          <span className='label-text text-gray-300'>Female</span>
          <input
            type='checkbox'
            className='checkbox bg-black border-white checked:border-white checked:bg-white checked:hover:bg-white hover:border-gray-400'
            checked={selectedGender === "female"}
            onChange={() => onCheckedChange("female")}
          />
        </label>
      </div>
    </div>
  )
}
export default GenderCheckbox
