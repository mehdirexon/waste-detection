from django.shortcuts import render
from django.core.exceptions import PermissionDenied
from django.shortcuts import redirect
from django.contrib.auth import logout


def main(request):
    if not request.user.is_authenticated:
        return render(request, 'errorPages/403.html', {})
    return render(request, "index.html", {"user_per": request.user.get_user_permissions()})


def logOut(request):
    logout(request)
    return redirect('home')
