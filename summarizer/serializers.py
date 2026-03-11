from rest_framework import serializers
from .models import UserSummary


class UserSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSummary
        fields = ['text', 'summary']
        read_only_fields = ['summary']    # Right for read only field
        # extra_kwargs = {      # also Right for read only field
        #     'summary': {"read_only": True}
        # }