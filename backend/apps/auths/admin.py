from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Department, Management, CustomUser


class CustomUserAdmin(UserAdmin):
    """Custom user admin."""

    list_display = [
        "id",
        "email",
        "last_name",
        "first_name",
        "middle_name",
        "is_active",
    ]

    list_display_links = [
        "id",
        "email",
        "last_name",
        "first_name",
        "middle_name",
        "is_active",
    ]

    readonly_fields = ["id"]

    fieldsets = [
        [
            "Personal",
            {
                "classes": ["wide"],
                "fields": [
                    "id",
                    "email",
                    "last_name",
                    "first_name",
                    "middle_name",
                    "date_of_birth",
                ],
            },
        ],
        [
            "Permissions",
            {
                "classes": ["wide"],
                "fields": [
                    "is_active",
                    "is_staff",
                    "is_superuser",
                ],
            },
        ],
    ]

    add_fieldsets = [
        [
            "Personal",
            {
                "classes": ["wide"],
                "fields": [
                    "email",
                    "last_name",
                    "first_name",
                    "middle_name",
                ],
            },
        ],
        [None, {"classes": ["wide"], "fields": ["password1", "password2"]}],
    ]

    search_fields = [
        "email",
        "last_name",
        "first_name",
        "middle_name",
    ]

    ordering = [
        "email",
        "last_name",
        "first_name",
        "middle_name",
    ]


admin.site.register(Department)
admin.site.register(Management)
admin.site.register(CustomUser, CustomUserAdmin)
