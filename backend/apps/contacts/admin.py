from django.contrib import admin
from .models import (
    Department,
    Management,
    Division,
    Job,
    Contact,
)

admin.site.register(Department)
admin.site.register(Management)
admin.site.register(Division)
admin.site.register(Job)
admin.site.register(Contact)
