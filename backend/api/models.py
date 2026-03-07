from django.db import models
from django.utils import timezone

class Bus(models.Model):
    id = models.CharField(max_length=20, primary_key=True)  # E.g. "BUS-001"
    plateNumber = models.CharField(max_length=20)
    routeCode = models.CharField(max_length=20)
    operator = models.CharField(max_length=100, null=True, blank=True)
    capacity = models.IntegerField(default=90)
    status = models.CharField(max_length=20, default='inactive')  # active, inactive, maintenance
    year = models.IntegerField()
    busLoginId = models.CharField(max_length=50, unique=True)
    busLoginCode = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.id} - {self.routeCode}"

class AuditLog(models.Model):
    timestamp = models.DateTimeField(default=timezone.now)
    operator = models.CharField(max_length=100)
    bus = models.CharField(max_length=20)
    route = models.CharField(max_length=20)
    action = models.CharField(max_length=50)  # E.g. "turn_on", "turn_off"
    detail = models.TextField()

    def __str__(self):
        return f"{self.bus} - {self.action} at {self.timestamp}"
