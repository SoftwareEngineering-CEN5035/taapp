// routes/routes.go
package routes

import (
	"ta-manager-api/handlers/committee"
	"ta-manager-api/handlers/course"
	"ta-manager-api/handlers/department"
	"ta-manager-api/handlers/login"
	"ta-manager-api/handlers/ta"
	"ta-manager-api/repository"

	"firebase.google.com/go/auth"
	"github.com/labstack/echo/v4"
)

func RegisterRoutes(e *echo.Echo, repo *repository.Repository, authClient *auth.Client) {
	// Add these to your RegisterRoutes function
	e.POST("/ta/application", func(c echo.Context) error {
		return ta.CreateTAApplication(c, repo, authClient)
	})
	e.POST("/courses", func(c echo.Context) error {
		return department.CreateCourseHandler(c, repo, authClient)
	})

	// e.POST("/courses", func(c echo.Context) error {
	// 	return department.CreateCourseHandler(c, repo, authClient)
	// })
	// e.POST("/CreateAccount", func(c echo.Context) error {
	// 	return login.CreateAccount(c, repo, authClient)
	// })
	e.POST("/login", func(c echo.Context) error {
		return login.Login(c, repo, authClient)
	})
	e.POST("/newuserwelcome", func(c echo.Context) error {
		return login.NewUserWelcome(c, repo, authClient)
	})

	e.GET("/checkUserDocument", func(c echo.Context) error {
		return login.CheckUserDocument(c, repo, authClient)
	})
	e.DELETE("/courses/:id", func(c echo.Context) error {
		return department.DeleteCourse(c, repo, authClient)
	})
	e.PATCH("/removeTaFromCourse", func(c echo.Context) error {
		return department.RemoveTAFromCourse(c, repo, authClient)
	})
	e.PATCH("/approveTaForCourse", func(c echo.Context) error {
		return department.ApproveTaForCourse(c, repo, authClient)
	})
	e.GET("/newForms", func(c echo.Context) error {
		return department.GetNewForms(c, repo, authClient)
	})
	e.GET("/courses", func(c echo.Context) error {
		return course.GetAllCourses(c, repo, authClient)
	})
	e.GET("/courses/:id", func(c echo.Context) error {
		return course.GetCoursesById(c, repo, authClient)
	})
	e.GET("/departmentForms/:taId", func(c echo.Context) error {
		return department.GetDepartmentFormsByTA(c, repo, authClient)
	})
	e.GET("/departmentPendingForms", func(c echo.Context) error {
		return department.GetFormsPending(c, repo, authClient)
	})
	e.PATCH("/courses", func(c echo.Context) error {
		return course.UpdateCourse(c, repo, authClient)
	})
	e.PATCH("/forms", func(c echo.Context) error {
		return department.UpdateDepartmentForm(c, repo, authClient)
	})
	e.GET("/coursesByTA/:id", func(c echo.Context) error {
		return course.GetCoursesByTA(c, repo, authClient)
	})
	e.GET("/forms/:id", func(c echo.Context) error {
		return department.GetFormById(c, repo, authClient)
	})
	e.GET("/form/:id", func(c echo.Context) error {
		return department.GetFormDocById(c, repo, authClient)
	})
	e.PATCH("/forms/:id", func(c echo.Context) error {
		return committee.UpdateFormStatus(c, repo, authClient)
	})
	e.GET("/formsByTa/:id", func(c echo.Context) error {
		return department.GetFormsByTA(c, repo, authClient)
	})
	e.GET("/users/:role", func(c echo.Context) error {
		return course.GetUserByRole(c, repo, authClient)
	})
	e.GET("/ta_applications/status", func(c echo.Context) error {
		return ta.GetFormsByStatus(c, repo, authClient)
	})
	e.GET("/ta_applications/user", func(c echo.Context) error {
		return ta.GetFormsByUser(c, repo, authClient)
	})
	e.GET("/ta_applications/:formId", func(c echo.Context) error {
		return ta.GetApplicationByID(c, repo, authClient)
	})
	e.PATCH("/ta_applications/:formId", func(c echo.Context) error {
		return ta.UpdateApplicationStatus(c, repo, authClient)
	})
	e.GET("/forms/status", func(c echo.Context) error {
		return committee.GetCommitteeFormsByStatus(c, repo, authClient)
	})

}
