/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";

type Field = {
  name: string;
  label: string;
  type: string;
  options?: string[]
}

type Prop = {
  fields: Field[];
  onSubmit: (data:any) => void;
  initialValues?: any;
}

const DynamicForm = ({fields, onSubmit, initialValues}: Prop) => {
  const [formData, setFormData] = useState<any>(initialValues || {});

  useEffect(() =>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData(initialValues || {})
  },[initialValues])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSelectChange = (name: string, value: string) =>{
    setFormData({...formData, [name]: value})
  }
  return (
    <Box className="flex flex-col items-center max-w-full" sx={{width: '400px'}}>
      {fields.map((field) =>{
        if (field.type === 'select'){
          return (
            <FormControl key={field.name} sx={{width:'100%'}}>
              <InputLabel id={`${field.label}-label`}>{field.label}</InputLabel>
              <Select
              labelId={`${field.label}-label`}
              id={field.label}
              name={field.name}
              label={field.label}
              value={formData[field.name] || ""}
              onChange={(e) =>{
                handleSelectChange(field.name, e.target.value)
              }}
              sx={{width:"95%", m:'10px auto 0'}}
              >
                {(field.options ?? []).map((opt) =>(
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )
        }
        return(
          <TextField
          name={field.name}
          label={field.label}
          value={formData[field.name] || ""}
          onChange={handleFormChange}
          sx={{width: '95%', mt:'10px'}}
          />
        )
 } )}
 <Button sx={{mt:'10px',mb:'10px'}} variant="contained" onClick={() => onSubmit(formData)}>Save</Button>
    </Box>
  )
}

export default DynamicForm