package validator

import (
	"go-rest-api/model"

	validation "github.com/go-ozzo/ozzo-validation/v4"
)

type ITaskValidator interface {
	TaskVlidate(task model.Task) error
}

type taskValidator struct{}

func NewTaskValidator() ITaskValidator {
	return &taskValitor{}
}

func (tv *taskValidator) TaskVlidate(task model.Task) error {
	return validation.ValidateStruct(&task,
		validation)
}
