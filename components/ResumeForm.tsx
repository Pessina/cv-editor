import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  LatexTemplateParams,
  createLatexTemplate,
} from "@/assets/latex-template";

export const ResumeForm: React.FC = () => {
  const { register, handleSubmit, control } = useForm<LatexTemplateParams>();
  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: "languages",
  });
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });
  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experience",
  });

  const onSubmit = (data: LatexTemplateParams) => {
    console.log(createLatexTemplate(data));
    // Generate LaTeX template with the form data and process it
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" gutterBottom>
        Resume Form
      </Typography>

      <TextField {...register("name")} label="Full Name" required />
      <TextField {...register("profession")} label="Profession" required />
      <TextField {...register("phone")} label="Phone Number" required />
      <TextField {...register("email")} label="Email" required />
      <TextField
        {...register("introduction")}
        label="Introduction"
        multiline
        fullWidth
        required
      />

      <Typography variant="h6">Languages</Typography>
      {languageFields.map((language, index) => (
        <Box key={language.id}>
          <TextField
            {...register(`languages.${index}.name` as const)}
            label="Language"
          />
          <IconButton onClick={() => removeLanguage(index)} color="error">
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Box>
      ))}
      <IconButton onClick={() => appendLanguage({ name: "" })}>
        <AddCircleOutlineIcon />
      </IconButton>

      <Typography variant="h6">Education</Typography>
      {educationFields.map((education, index) => (
        <Box key={education.id}>
          <TextField
            {...register(`education.${index}.field` as const)}
            label="Field of Study"
          />
          <TextField
            {...register(`education.${index}.duration` as const)}
            label="Duration"
          />
          <TextField
            {...register(`education.${index}.institution` as const)}
            label="Institution"
          />
          <TextField
            {...register(`education.${index}.location` as const)}
            label="Location"
          />
          <IconButton onClick={() => removeEducation(index)} color="error">
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Box>
      ))}
      <IconButton
        onClick={() =>
          appendEducation({
            field: "",
            duration: "",
            institution: "",
            location: "",
          })
        }
      >
        <AddCircleOutlineIcon />
      </IconButton>

      <Typography variant="h6">Experience</Typography>
      {experienceFields.map((experience, index) => (
        <Box key={experience.id}>
          <TextField
            {...register(`experience.${index}.name` as const)}
            label="Company"
          />
          <TextField
            {...register(`experience.${index}.duration` as const)}
            label="Duration"
          />
          <TextField
            {...register(`experience.${index}.position` as const)}
            label="Position"
          />
          <TextField
            {...register(`experience.${index}.location` as const)}
            label="Location"
          />
          <TextField
            {...register(`experience.${index}.description` as const)}
            label="Description"
            multiline
            fullWidth
          />
          <IconButton onClick={() => removeExperience(index)} color="error">
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Box>
      ))}
      <IconButton
        onClick={() =>
          appendExperience({
            name: "",
            duration: "",
            position: "",
            location: "",
            description: "",
          })
        }
      >
        <AddCircleOutlineIcon />
      </IconButton>

      <Box mt={2}>
        <Button type="submit" variant="contained">
          Generate LaTeX
        </Button>
      </Box>
    </Box>
  );
};

export default ResumeForm;
