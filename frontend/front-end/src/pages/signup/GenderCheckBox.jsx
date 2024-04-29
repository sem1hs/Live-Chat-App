function GenderCheckBox({ handleGenderClick, inputs, setInputs }) {
  return (
    <div className="flex gap-2">
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Male</span>
          <input
            value={"male"}
            checked={inputs.gender === "male"}
            onChange={(e) => e.target}
            onClick={handleGenderClick}
            type="checkbox"
            className="checkbox border-slate-900"
          />
        </label>
      </div>

      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Female</span>
          <input
            value={"female"}
            checked={inputs.gender === "female"}
            onChange={(e) => e.target}
            onClick={handleGenderClick}
            type="checkbox"
            className="checkbox border-slate-900"
          />
        </label>
      </div>
    </div>
  );
}

export default GenderCheckBox;
