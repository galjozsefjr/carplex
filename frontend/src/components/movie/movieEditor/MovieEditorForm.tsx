import { CalendarIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
  VStack
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import type { FC } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { CertificationList } from '@/types/Certification';
import type { CreateMovie } from '@/types/Movie';
import { movieValidationSchema } from './movieValidationSchema';

const numberInputStyle = {
  backgroundColor: 'interactive.input.background.default',
  borderColor: 'transparent',
  _hover: {
    borderColor: 'background.medium'
  }
};

export type MovieEditorStatus = 'added' | 'updated' | 'error';

export interface MovieEditorFormProps {
  movie: CreateMovie | null;
  onCancel: () => void;
  onSubmit: SubmitHandler<CreateMovie>;
}

const DEFAULT_MOVIE_VALUES: CreateMovie = {
  title: '',
  tagline: undefined,
  poster_path: '',
  overview: '',
  runtime: 0,
  certification: null,
  release_date: ''
};

export const MovieEditorForm: FC<MovieEditorFormProps> = ({ movie, onCancel, onSubmit }) => {
  const form = useForm<CreateMovie>({
    defaultValues: movie ?? DEFAULT_MOVIE_VALUES,
    // @ts-expect-error
    resolver: yupResolver(movieValidationSchema)
  });

  // @ts-expect-error
  const handleSubmit = form.handleSubmit(onSubmit);
  const handleReset = () => {
    form.reset(movie ?? DEFAULT_MOVIE_VALUES);
    onCancel();
  };
  const { errors, isSubmitting, isValid, isValidating } = form.formState;

  const releaseDateField = form.register('release_date', { valueAsDate: true });

  return (
    <VStack as="form" noValidate onSubmit={handleSubmit} spacing="8">
      <Flex gap="8" width="full">
        <FormControl isInvalid={!!errors?.title} isRequired={true}>
          <FormLabel>Film címe</FormLabel>
          <Input {...form.register('title')} />
          <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
        </FormControl>
        <FormControl flexBasis="35%" flexShrink={0} isInvalid={!!errors.release_date} isRequired={true}>
          <FormLabel>Bemutató ideje</FormLabel>
          <InputGroup>
            <Input placeholder="Bemutató ideje" type="date" {...releaseDateField} />
            <InputRightElement>
              <CalendarIcon color="text.highlighted" />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.release_date?.message}</FormErrorMessage>
        </FormControl>
      </Flex>

      <Flex gap="8" width="full">
        <FormControl isInvalid={!!errors.poster_path} isRequired={true}>
          <FormLabel>Poszter</FormLabel>
          <Input placeholder="https://" type="url" {...form.register('poster_path')} />
          <FormErrorMessage>{errors?.poster_path?.message}</FormErrorMessage>
        </FormControl>
      </Flex>

      <Flex gap="8" width="full">
        <FormControl isInvalid={!!errors.tagline}>
          <FormLabel>Szlogen</FormLabel>
          <Input type="text" {...form.register('tagline')} />
          <FormErrorMessage>{errors?.tagline?.message}</FormErrorMessage>
        </FormControl>
      </Flex>

      <Flex gap="8" width="full">
        <FormControl flexBasis="35%" flexShrink={0} isInvalid={!!errors?.runtime} isRequired={true}>
          <FormLabel>Hossz (perc)</FormLabel>
          <Controller
            control={form.control}
            name="runtime"
            render={({ field: { value, onChange } }) => (
              <NumberInput min={0} name="runtime" onChange={(_, runtime) => onChange(runtime)} value={value}>
                <NumberInputField placeholder="perc" sx={numberInputStyle} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
          />
          <FormErrorMessage>{errors?.runtime?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors?.certification}>
          <FormLabel>Korhatári besorolás</FormLabel>
          <Select {...form.register('certification')} borderColor="transparent" placeholder="Válasszon!" sx={{ '--select-bg': 'bacgkround.input' }}>
            {Object.entries(CertificationList).map(([certifcation, descrption]) => (
              <option key={certifcation} value={certifcation}>
                {descrption}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors?.certification?.message}</FormErrorMessage>
        </FormControl>
      </Flex>

      <FormControl isInvalid={!!errors?.overview} isRequired={true}>
        <FormLabel>Összegzés</FormLabel>
        <Textarea {...form.register('overview')} placeholder="Movie description" resize="none" rows={8} />
        <FormErrorMessage>{errors?.overview?.message}</FormErrorMessage>
      </FormControl>

      <ButtonGroup gap={3} isDisabled={isSubmitting} justifyContent="flex-end" paddingTop={8} width="full">
        <Button onClick={handleReset} size="lg" type="reset" variant="secondary">
          Mégsem
        </Button>
        <Button
          data-info={JSON.stringify({ isSubmitting, isValid, isValidating, status, err: errors.certification?.message })}
          isDisabled={isSubmitting || isValidating || status === 'added'}
          size="lg"
          type="submit"
        >
          Mentés
        </Button>
      </ButtonGroup>
    </VStack>
  );
};
